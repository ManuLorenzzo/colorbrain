export default function secondsToString(momentSeconds) {
  try {
    let string = ''
    if (momentSeconds.hours() !== 0) string += momentSeconds.hours() + 'h '
    if (momentSeconds.minutes() !== 0) string += momentSeconds.minutes() + 'min '
    if (momentSeconds.seconds() !== 0) string += momentSeconds.seconds() + 's '
    return string
  } catch (error) {
    console.error(error)
    return ''
  }
}
