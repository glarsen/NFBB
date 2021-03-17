const sanitize = function(node) {
    node.innerHTML = node.innerHTML.replaceAll('NFT', 'Digital Beanie Baby')
}

const options = {childList: true, subtree: true}

const callback = function(mutations, observer) {
    mutations.forEach( (mutation) => {
        switch(mutation.type) {
            case 'childList':
                for(const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        spans = node.getElementsByTagName('span')
                        for (let i = 0; i < spans.length; i++) {
                            sanitize(spans[i])
                        }
                    }
                }
                break;
        }
    })
}

const observer = new MutationObserver(callback);

observer.observe(document.getRootNode(), options)
