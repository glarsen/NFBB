const sanitize = function(node) {
    node.innerHTML = node.innerHTML.replaceAll('NFT', 'Digital Beanie Baby')
}

const scan = function (node, tag) {
    elements = node.getElementsByTagName(tag)
    for (let i = 0; i < elements.length; i++) {
        sanitize(elements[i])
    }
}

// Handle static pages
window.onload = function() {
    scan(document.getRootNode(), 'p')
    scan(document.getRootNode(), 'span')
}

// Monitor dynamic pages
const options = {childList: true, subtree: true}
const callback = function(mutations, observer) {
    mutations.forEach( (mutation) => {
        switch(mutation.type) {
            case 'childList':
                for(const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        scan(node, 'p')
                        scan(node, 'span')
                    }
                }
                break;
        }
    })
}

const observer = new MutationObserver(callback);
observer.observe(document.getRootNode(), options)
