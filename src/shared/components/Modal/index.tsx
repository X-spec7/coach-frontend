const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='relative bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <button className='absolute top-2  right-4 text-3xl text-gray-500 hover:text-gray-700' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal