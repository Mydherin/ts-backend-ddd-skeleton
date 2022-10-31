#!/bin/bash
(cd ./src && find . \( -name "*.yaml" -o -name "*.json" \) -exec cp --parents -t ../build/ {} +)