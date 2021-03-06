

// https://github.com/facebook/react-native/issues/10218
export function formatSpace(str) {
  return str.replace(/\u0020/, '\u00a0')
}


export function getElapsed(start) {
  return Math.floor((Date.now() - start) / 1000)
}


export function getDay(offset = 0) {
  const d = new Date(Date.now())
  d.setTime(d.getTime() + offset * 24 * 60 * 60 * 1000)

  return d
}


export function displayTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)

  const displayMinutes = minutes < 10 ? '0' + minutes : minutes
  const displaySeconds = seconds < 10 ? '0' + seconds : seconds

  return `${displayMinutes}:${displaySeconds}`
}


export function hsl2rgb(h, s, l) {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = function(p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t)

      return p
    }

    let q
    if (l < 0.5) {
      q = l * (1 + s) 
    } else {
      q = l + s - l * s
    }

    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}


export function hsl2hex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * 6 * (2/3 - t)

      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  const toHex = x => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export function getUniqueColors(numColors) {
  colors = []

  for (let i = 0; i <= 360; i += 360 / numColors) {
    let h, s, l

    h = i
    s = 100
    l = 30

    colors.push(hsl2hex(h, s, l))
  }

  return colors
}


export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

