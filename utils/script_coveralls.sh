#!/bin/bash
repo=$(git rev-parse --show-toplevel)
echo "COVERALLS_REPO_TOKEN=${COVERALLS_REPO_TOKEN}" > ${repo}/Docker/Test/env/coveralls.env && exit 0
