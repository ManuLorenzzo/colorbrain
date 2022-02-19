export default function changeValue({ i, newValue, values, selectedBubble, setSelectedBubble }) {
  try {
    if (i >= values.length)
      throw new Error('El nuevo valor tiene un índice mayor que la longitud del array')

    const aux = JSON.parse(JSON.stringify(values))
    aux[i] = newValue
    if (!aux.some(elem => elem == null) && selectedBubble === i) {
      setSelectedBubble(null)
    }

    return aux
  } catch (err) {
    console.error(err)
  }
}
