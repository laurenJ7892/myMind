import { useState } from 'react'

const Modal = ({ heading, text }) => {
  const [showModal, setShowModal] = useState(true)

  return (
    <div>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-auto max-w-sm">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                <h5 className="text-3xl font-semibold">{heading}</h5>
                <button className="" onClick={() => setShowModal(false)}>
                  X
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg leading-relaxed text-cyan-800">{text}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Modal
