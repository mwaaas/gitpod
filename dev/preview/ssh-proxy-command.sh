#!/usr/bin/env bash

VM_NAME="$(git symbolic-ref HEAD 2>&1 | awk '{ sub(/^refs\/heads\//, ""); $0 = tolower($0); gsub(/[^-a-z0-9]/, "-"); print }')"
NAMESPACE="preview-${VM_NAME}"

while getopts n:p: flag
do
    case "${flag}" in
        n) NAMESPACE="${OPTARG}";;
        p) PORT="${OPTARG}";;
        *) ;;
    esac
done

pkill -f "kubectl --context=harvester (.*)${PORT}:2200"
kubectl \
    --context=harvester \
    --kubeconfig=/home/gitpod/.kube/config \
    -n "${NAMESPACE}" port-forward service/proxy "${PORT}:2200" > /dev/null 2>&1 &

# Wait for the port to be read
ssh -o BatchMode=yes -p 8022 -o ConnectTimeout=5 ubuntu@localhost echo ok 2>&1
echo $?

# Use netcat as SSH expects ProxyCommand to read and write using stdin/stdout
netcat -X connect localhost "${PORT}"
