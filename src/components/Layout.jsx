import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import catCoffeeLogo from "../assets/image/catCoffeeLogo.png"


export default function Layout(props) {
    const { children } = props;
    const { globalUser, logout } = useAuth();


    const header = (
        <header>
            <div className="d-flex mb-3">
                <div className="p-3 w-50">
                    <img src={catCoffeeLogo} className="rounded-circle w-50 border border-danger-subtle border-3" alt="cat Coffee"></img>
                </div>
                <div className="ms-auto p-3">
                    {
                        globalUser ?
                            <button
                                type="button"
                                className="btn btn-outline-secondary p-3"
                                onClick={logout}
                            >
                                <span className="fw-bold">
                                    登出  <i className="fa-solid fa-right-from-bracket"></i>
                                </span>
                            </button> :
                            <button
                                type="button"
                                className="btn btn-outline-secondary p-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <span className="fw-bold">
                                    登入  <i className="fa-solid fa-right-to-bracket"></i>
                                </span>
                            </button>
                    }
                </div>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col py-3 pt-5 text-center">
                        <span className="gradient-start fw-bolder">Cat Coffee</span> was made by
                            <a target="_blank" href="#"> Ada Chen </a> using the
                            <a href="https://react.dev/" target="_blank"> React </a> and
                            <a target="_black" href="https://getbootstrap.com/"> Bootstrap </a>!
                    </div>
                </div>
            </div>
        </footer>
    );


    return (
        <>
            <Modal>
                <Authentication />
            </Modal>
            {header}
            <main className="main-bg-color">
                {children}
            </main>
            {footer}
        </>
    )
}