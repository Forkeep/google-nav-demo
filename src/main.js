const $siteList = $('.personal-site')
const $lastSite = $siteList.find('section.add-site')
const personHash = localStorage.getItem('personHash')
const personHashObject = JSON.parse(personHash)
const hashMap = personHashObject || [
    {logo: 'A', url: 'https://www.acfun.cn', color: '1'},
    {logo: 'B', url: 'https://www.bilibili.com', color: '2'}
]

const hashColor = {
    0: '#5186ed',
    1: '#d95140',
    2: '#f2be42',
    3: '#58a55d'
}

const simpleUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const getRandom = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const render = () => {
    $siteList.find('section:not(.add-site)').remove()
    hashMap.forEach((node, index) => {
        const $section = $(`
              <section class="one-site">
                    <div class="delete">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youcecaidan"></use>
                        </svg>
                    </div>
                    <div class="site-logo">
                        <div class="site-logo-wrapper" style="background-color: ${hashColor[node.color]}">
                            <span>${node.logo}</span>
                        </div>
                    </div>
                    <div class="site-name">${simpleUrl(node.url)}</div>
                </section>
        `).insertBefore($lastSite)
        $section.on('click', () => {
            window.open(node.url)
        })
        $section.on('mouseover', (e) => {
            $(e.currentTarget).find('div.delete').addClass('active')

        })
        $section.on('mouseleave', (e) => {
            $(e.currentTarget).find('div.delete').removeClass('active')
        })
        $section.find('div.delete').on('click', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })

}

render()


$('.add-site').on('click', () => {
    let url = window.prompt('请输入标签页网址😁')
    if (url !== '') {
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }

        hashMap.push({
            logo: simpleUrl(url)[0],
            url: url,
            color: getRandom(4)
        })
        render()
    }

})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('personHash', string)
}

$(document).on('keypress', (e) => {
    if (e.ctrlKey && e.key) {
        key = Number(e.key)
        hashMap.forEach((node, index) => {
            index+=1
            if (index === key) {
                window.open(node.url)
            }
        })
    }

})