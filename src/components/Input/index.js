import './index.css'
export const Input = ({ ...props }) => {
  return (
    <input className='inputField' {...props} onKeyDown={
      e => {
        if (e.keyCode === 13) {
          console.log(e.key)
        }
      }
    } />
  )
}