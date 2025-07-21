import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Authentication() {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const { signup, login } = useAuth();

    function handleCloseModal() {
        $('#exampleModal').modal('hide');

        return;
    }

    async function handleAuthenticate() {
        if (
            !email || !email.includes("@") ||
            !password || password.length < 6 ||
            isAuthenticating
        ) {
            setError('輸入錯誤');

            return;
        }


        try {
            setIsAuthenticating(true);
            setError(null);


            if (isRegistration) {
                await signup(email, password);
            }
            else {
                await login(email, password);
            }


            handleCloseModal();
        }
        catch (err) {
            console.log(err.message);

            setError(err.message);
        }
        finally {
            setIsAuthenticating(false);
        }
    }


    return (
        <>
            <h2 className="fw-bolder">
                {
                    isRegistration ?
                        '註冊' : '登入'
                }
            </h2>
            <p>
                {
                    isRegistration ?
                        '建立帳號!' : '已註冊帳號!'
                }
            </p>
            {
                error &&
                <p className="fw-bolder text-danger"><i className="fa-solid fa-circle-xmark" /> {error}</p>
            }

            <form className="py-4" action={handleAuthenticate}>
                <div className="mb-3">
                    <label htmlFor="validationInputEmail1" className="form-label">電子郵件</label>
                    <input type="email" className="form-control" id="validationInputEmail1" aria-describedby="emailHelp" placeholder="Email" required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="validationInputPassword1" className="form-label">密碼</label>
                    <input type="password" className="form-control" id="validationInputPassword1" placeholder="******" required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <div id="passwordHelpBlock" className="form-text">
                        最少6個字。
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {
                        isRegistration ?
                            '註冊驗證' : '送出'
                    }
                </button>
            </form>


            <hr />

            <p className="mt-3">
                {
                    isRegistration ?
                        '已經有帳號了?' : '還沒有帳號?'
                }
            </p>
            <button type="button" className="btn btn-outline-success"
                onClick={() => {
                    setIsRegistration(!isRegistration)
                }}
            >
                {
                    isRegistration ?
                        '登入' : '建立帳號'
                }
            </button>
        </>
    )
}