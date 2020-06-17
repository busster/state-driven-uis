let page = 1

const get = (url, token) => new Promise((resolve, reject) => {
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (client.readyState === 4) {
      setTimeout(() => {
        resolve(JSON.parse(client.response))
      }, 1500)
    }
  }
  client.open('GET', url)
  client.setRequestHeader('Authorization', token)
  client.send()
})

const getPhotos = (options) => new Promise((resolve, reject) => {
  const { searchTerm } = Object.assign({}, options, { searchTerm: 'dogs' })
  if (Math.random() > 0.75) reject('Failed for some reason')

  page = (page % 10) + 1

  const token = '563492ad6f917000010000018ec71e36b85d47848fd284797d653b66'
  const url = 'https://api.pexels.com/v1/search?query={searchTerm}&per_page=20&page={page}'
    .replace('{searchTerm}', searchTerm)
    .replace('{page}', page)
  return get(url, token).then(resolve).catch(reject)
})
