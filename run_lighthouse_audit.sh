#!/bin/bash

OUTPUT="$(netlify deploy --dir='dist' | grep -Eo '(http|https)://[^/]+' | sed -n '1!p')"
echo $OUTPUT
lighthouse-ci $OUTPUT --score=10
