export default function Footer() {
    const footerStyle = {
        backgroundColor: "#cacaca",
        color: "rgba(0, 0, 0, .7)"
    };

    const linkStyle = {
        color: "rgba(0, 0, 0, .7)",
        textDecoration: "none"
    };

    const socialButtonStyle = {
        borderRadius: "30px",
        backgroundColor: "black",
        border: "none"
    };

    const iconStyle = {
        color: "white"
    };

    return (
        <footer className="text-center text-lg-start text-white" style={footerStyle}>
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Company</h5>
                            <p><a href="contact-us.php" style={linkStyle}>Contact US</a></p>
                            <p><a style={linkStyle}>Our Services</a></p>
                            <p><a style={linkStyle}>Privacy Policy</a></p>
                            <p><a style={linkStyle}>Affiliate Program</a></p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Get Help</h5>
                            <p><a style={linkStyle}>FAQ</a></p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
                            <p style={linkStyle}><i className="fas fa-home mr-3"></i> Mawanella, Sri Lanka</p>
                            <p style={linkStyle}><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                            <p style={linkStyle}><i className="fas fa-phone mr-3"></i> + 94 234 567 88</p>
                            <p style={linkStyle}><i className="fas fa-print mr-3"></i> + 94 234 567 89</p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h5 className="text-uppercase mb-4 font-weight-bold">Follow us</h5>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-facebook-f" style={iconStyle}></i></a>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-twitter" style={iconStyle}></i></a>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-google" style={iconStyle}></i></a>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-instagram" style={iconStyle}></i></a>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-linkedin-in" style={iconStyle}></i></a>
                            <a className="btn btn-floating m-1" style={socialButtonStyle} href="#!" role="button"><i className="fab fa-github" style={iconStyle}></i></a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2023 Copyright: &nbsp;&nbsp;
                <a style={linkStyle} href="#">HealthLink.com</a>
            </div>
        </footer>
    );
}