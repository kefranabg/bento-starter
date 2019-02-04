#!/bin/bash

OUTPUT="$(./node_modules/.bin/netlify deploy --dir='dist' | grep -Eo '(http|https)://[^/]+' | sed -n '1!p')"
"$(./node_modules/.bin/lighthousebot ${OUTPUT})"


