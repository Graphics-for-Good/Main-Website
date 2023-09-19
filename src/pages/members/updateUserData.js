import defaultBio from './defaultBio.js'

function updateUserData(userData) {
  userData.nameNoTitle = userData.name
  if (userData.nameNoTitle.includes('<')) {
    userData.nameNoTitle = userData.nameNoTitle.split('<')[0]
  }
  
  if (!!userData.pfp.g4g) {
    userData.pfp.url = `/assets/members/${userData.username}/pfps/pfp-${userData.pfp.g4g.sizes[0].name}.${userData.pfp.g4g.sizes[0].ext}`.replace('-full', '')
  }
  else {
    if (!!userData.pfp.google.a === false) {
      userData.pfp.google.a = 'a'
    }
    userData.pfp.url = `https://lh3.googleusercontent.com/${userData.pfp.google.a}/${userData.pfp.google.url}=s128`
  }
  
  if (!!userData.email.g4g) {
    userData.email.address = `${userData.username}@graphics-for-good.com`
  }
  else {
    let uName = userData.name
    if (uName.includes('<')) {
      uName = uName.split('<')[0]
    }
    uName = uName.split(' ')
    userData.email.address = `${uName[0].split('')[0]}${uName[1]}${userData.email.dtech.year}`.toLowerCase() + '@dtechhs.org'
  }
  
  userData.location.combined = `${userData.location.city}, ${userData.location.state}<BLAHBLAH>`
    .replace(', <BLAHBLAH>', '').replace('<BLAHBLAH>', '')
  
  userData.location.mapLink = userData.location.combined
  while (userData.location.mapLink.includes(' ')) {
    userData.location.mapLink = userData.location.mapLink.replace(' ', '+')
  }
  userData.location.mapLink = `https://www.google.com/maps/place/${userData.location.mapLink}`
  
  userData.socials.forEach(function(social, i) {
    userData.socials[i].icon = `/assets/icons/${social.name.toLowerCase()}.svg`
  })
  
  if (!!userData.bio) {
    if (!!userData.bio.w1 && !!userData.bio.w2) {
      userData.bio.result = defaultBio(userData.name, userData.bio.w1, userData.bio.w2)
    }
    else if (!!userData.bio.w1) {
      userData.bio.result = defaultBio(userData.name, userData.bio.w1)
    }
    else if (!!userData.bio.w2) {
      userData.bio.result = defaultBio(userData.name, false, userData.bio.w2)
    }
    else {
      userData.bio.result = defaultBio(userData.name)
    }
  }
  else {
    userData.bio = {}
    userData.bio.result = defaultBio(userData.name)
  }
  
  if (userData.bio.result.includes('{pronunciation}')) {
    // if (!!userData.pronunciation) {
    //   userData.bio.result = userData.bio.result.replace('{pronunciation}', userData.pronunciation)
    // }
    // else {
      userData.bio.result = userData.bio.result.replace('{pronunciation}', '')
    // }
  }
  
  userData.portfolio.forEach(function(photo, i) {
    var path = ''
    var element = photo['img']['element']
    if (element !== 'iframe') {
      path = `/assets/members/${userData.username}/portfolio/previews/${photo['img']['path'].replace('.svg', '.png')}`
    }
    else if (photo['img']['path'].endsWith('.pdf')) {
      path = `/assets/members/${userData.username}/portfolio/previews/${photo['img']['path'].replace('.pdf', '.png')}`
    }
    else {
      path = photo['img']['path']
    }
                  
    var capt = photo['capt']
    while (capt.includes('<a target="_blank" href="/')) {
      capt = capt.replace('<a target="_blank" href="/', '<a href="/')
    }
                  
    var desc = photo['desc']
    while (desc.includes('<a target="_blank" href="/')) {
      desc = desc.replace('<a target="_blank" href="/', '<a href="/')
    }
                  
    var name = photo['img']['path']
    
    if (path === 'YouTube') {
      name = `https://www.youtube-nocookie.com/embed/${photo['img']['vid_id']}?rel=0`
      path = `https://img.youtube.com/vi/${photo['img']['vid_id']}/maxresdefault.jpg`
    }
    var title = `${capt}. Click to enlarge!`.replace('..', '.').replace('!.', '!')
    title = title.split('<')
    title.forEach(function(t, i) {
      if (t.includes('>')) {
        t = t.split('>')[1]
        title[i] = t
      }
    })
    title = title.join('')
    let onclickVal = `showItem('` + name + `', '` + element + `', '` + capt + `', '` + desc + `', ` + 'p' + `)`
    userData.portfolio[i].html = '<img src="' + path + '" title="' + title + '"' + ` onclick="${onclickVal}"/>`
  })

  return userData
}
  
export default updateUserData