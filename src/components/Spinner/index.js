
import './index.css'

export const Spinner = () => {
  return (
    <div
      style={{
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000CC'
      }}
    >
      <span className="loader" style={{ height: '60px', width: '60px', backgroundColor: 'transparent' }} ></span>
    </div>
  )
}