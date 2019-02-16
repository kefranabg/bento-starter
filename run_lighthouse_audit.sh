#!/bin/bash

OUTPUT="$(netlify deploy --dir='dist' | grep -Eo '(http|https)://[^/]+' | sed -n '1!p')"
lighthouse-ci $OUTPUT --score=70
