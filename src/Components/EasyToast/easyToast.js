import { toast } from 'react-toastify'

export default function easyToast(type, text, duration = 2000) {
  return toast[type](text, {
    autoClose: duration,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { background: '#6d748f', color: '#fff' },
  })
}
