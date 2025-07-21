import ReactDom from 'react-dom'


export default function Modal(props) {
    const { children } = props;


    return ReactDom.createPortal(
        <div className="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen-md-down">
                <div className="modal-content px-2 px-sm-5">
                    <div className="modal-header border-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body pb-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}