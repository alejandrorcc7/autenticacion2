import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const PagSecreta = () => {

    const { user, updateProfile, checkAuth } = useAuth()

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [mensaje, setMensaje] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const data = await updateProfile({ mensaje })

        if (data.error) {
            setMessage(null)
            setError(data?.error)
        } else {
            setError(null)
            setMessage(data?.message)
        }
    }
    useEffect(() => {
        setMensaje(user?.pagSecreta?.mensaje)
    }, [])

    return (
        <div className='w-75 mx-auto my-5'>

            <h2>Un secreto</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    id="mensaje"
                    className="form-control mb-3"
                    placeholder="Profe estoy aprendiendo a programar"
                    value={mensaje}
                    onChange={e => setMensaje(e.target.value)}
                    rows="5"  
                ></textarea>

                <button className="btn btn-primary btm-sm py-2 w-25">
                    Actualizar
                </button>
            </form>
        </div>
    )


}
export default PagSecreta