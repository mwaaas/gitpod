#!/usr/bin/env bash

set -euo pipefail

THIS_DIR=$(dirname "$0")

function log {
    echo "[$(date)] $*"
}

function has-harvester-access {
    kubectl --context=harvester auth can-i get secrets > /dev/null 2>&1 || false
}

if ! has-harvester-access; then
    "$THIS_DIR"/download-and-merge-harvester-kubeconfig.sh
fi

"$THIS_DIR"/install-vm-ssh-keys.sh

# KUBECONFIG_PATH="/home/gitpod/.kube/config"
# KUBECONFIG_PATH="$(mktemp)"
# MERGED_KUBECONFIG_PATH="$(mktemp)"



# scp ubuntu@127.0.0.1 \
#     -o UserKnownHostsFile=/dev/null \
#     -o StrictHostKeyChecking=no \
#     -o "ProxyCommand=/workspace/gitpod/dev/preview/ssh-proxy-command.sh %p ${namespace}" \
#     -i "$HOME/.ssh/vm_id_rsa" \
#     -p 8022


# log "Downloading and preparing VM kubeconfig"
# kubectl -n werft get secret harvester-kubeconfig -o jsonpath='{.data}' \
# | jq -r '.["harvester-kubeconfig.yml"]' \
# | base64 -d \
# | sed 's/default/harvester/g' \
# > "${HARVESTER_KUBECONFIG_PATH}"

# # Order of files is important, we have the original config first so we preserve
# # the value of current-context
# log "Merging kubeconfig files ${KUBECONFIG_PATH} ${HARVESTER_KUBECONFIG_PATH} into ${MERGED_KUBECONFIG_PATH}"
# KUBECONFIG="${KUBECONFIG_PATH}:${HARVESTER_KUBECONFIG_PATH}" \
#     kubectl config view --flatten --merge > "${MERGED_KUBECONFIG_PATH}"

# log "Overwriting ${KUBECONFIG_PATH}"
# mv "${MERGED_KUBECONFIG_PATH}" "${KUBECONFIG_PATH}"

# log "Cleaning up temporay Harveter kubeconfig"
# rm "${HARVESTER_KUBECONFIG_PATH}"

# log "Done"
