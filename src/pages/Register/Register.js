// Meu CSS
import styles from './Register.module.css'

// MEUS Importe
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
    const [ displayName, setDisplayName ] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState("");

    const { createUser, error: authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        
        const user = { displayName, email, password}

        if (password !== confirmPassword) {
            setError ("As senhas precisam ser identicas")
            return
        }
        
        const res = await createUser(user);

        console.log(user);
    };
    useEffect(()=> {
        if (authError){
            setError(authError)
        }
    }, [authError])

  return (
    <div className={`${styles.register} container`}>
        <h2>Registre-se para postar seu conteúdo</h2>
        <p>Crie seu Usuário e compartilhe suas histórias.</p>
        <form onSubmit={ handleSubmit }>
            <label>
                <span>Nome do Usuário</span>
                <input type="text" name='displayName' required placeholder='Nome do Usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </label>
            <label>
                <span>E-mail</span>
                <input type="email" name='email' required placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha</span>
                <input type="password" name='password' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>
                <span>Confirme sua senha</span>
                <input type="password" name='confirmPassword' required placeholder='Confirme sua sua senha'value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            { !loading && <button className='btn btn-success my-4' type='submit'>Cadastrar</button>}
            { loading && <button className='btn btn-success my-4'disabled type='submit'>Aguarde...</button>}
            {error && <p className={`text-danger ${styles.error}`}>{error}</p>}
        </form>

    </div>
  )
}

export default Register