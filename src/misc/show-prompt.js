let deferredPrompt

window.addEventListener('beforeinstallprompt', async e => {
  e.preventDefault()
  deferredPrompt = e

  deferredPrompt.prompt()
  await deferredPrompt.userChoice
  deferredPrompt = null
})
