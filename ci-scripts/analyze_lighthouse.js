#!/usr/local/bin/node

const fs = require('fs')
const path = require('path')

const pkg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const requiredScores = pkg.lighthouse.requiredScores
const reportsDir = process.argv[3]
const reports = {
  json: []
}

fs.readdirSync(reportsDir).forEach(file => {
  if (path.extname(file) === '.json') {
    reports.json.push(
      JSON.parse(fs.readFileSync(path.resolve(reportsDir, file), 'utf8'))
    )
    return
  }
})

let success = true
const ciStdout = []

const [scoresAcrossRunsByCategory, budget] = reports.json.reduce(
  (scores, run) => {
    // Fetch expected & actual lighthouse scores.
    Object.keys(requiredScores).forEach(category => {
      scores[category] = scores[category] || []
      scores[category].push(run.categories[category].score * 100)
    })

    // Fetch overbudget items.
    const budgetsItems =
      run.audits &&
      run.audits['performance-budget'] &&
      run.audits['performance-budget'].details &&
      run.audits['performance-budget'].details.items

    const budgetReport = budgetsItems
      ? budgetsItems.reduce((acc, obj) => {
          if (obj.countOverBudget) {
            acc[obj.resourceType + '-count'] = `${obj.countOverBudget}`
          }

          if (obj.sizeOverBudget) {
            acc[obj.resourceType + '-size'] = `${Math.round(
              obj.sizeOverBudget / 1024,
              0
            )}kb`
          }

          return acc
        }, {})
      : []

    return [scores, budgetReport]
  },
  {}
)

ciStdout.push(
  '------------------------------------------',
  `\tLighthouse report`,
  '------------------------------------------'
)

// Report scores
Object.keys(requiredScores).forEach(category => {
  const requiredOutOf100 = requiredScores[category]
  const actualBestOutOf100 = Math.max.apply(
    null,
    scoresAcrossRunsByCategory[category]
  )

  if (actualBestOutOf100 < requiredScores[category]) {
    ciStdout.push(`❌ ${category}: ${actualBestOutOf100}/${requiredOutOf100}`)
    success = false
  } else {
    ciStdout.push(`✅ ${category}: ${actualBestOutOf100}/${requiredOutOf100}`)
  }
})

// Report budget
Object.keys(budget).forEach(budgetItem => {
  ciStdout.push(`❌ ${budgetItem}: Over budget. (${budget[budgetItem]})`)
  success = false
})

console.log(ciStdout.join('\n'))

if (!success) {
  process.exit(1)
}
