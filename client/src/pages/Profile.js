import Profile from "../assets/img/Profile.jpg"
import Mouse from '../assets/img/Mouse.png'
import Navigation from "../components/Navbar"

const ProfilePage = () => {


    return (
        <div>
            <Navigation />
            <div className="profile-page">
                <div className="prfl-cont">
                    <div className="prfl-main">
                        <div className="prfl-desc">
                            <h2>My Profile</h2>
                            <div className="prfl-content">
                                <div className="prfl-img">
                                    <img
                                        src={Profile}
                                        className="img-fluid rounded"
                                        alt="avatar"
                                    />
                                </div>
                                <div className="prfl-content-desc">
                                    <h3>Name</h3>
                                    <p>John Doe</p>
                                    <br />
                                    <h3>Email</h3>
                                    <p>johndoe@gmail.com</p>
                                    <br />
                                    <h3>Phone</h3>
                                    <p>012345678</p>
                                    <br />
                                    <h3>Gender</h3>
                                    <p>-</p>
                                    <br />
                                    <h3>Address</h3>
                                    <p>West Ham Street 69th London</p>
                                    <br />
                                </div>
                            </div>
                        </div>
                        <div className="recent-trx">
                            <div className="recent-trx-cont">
                                <h2>My Transaction</h2>
                                <div className="recent-trx-card">
                                    <div className="recent-trx-card-left">
                                        <div className="recent-product">
                                            <div className="recent-product-img">
                                                <img src={Mouse} alt="Mouse" />
                                            </div>
                                            <div className="recent-product-desc">
                                                <div className="tittle"><h2>Mouse</h2></div>
                                                <div className="date"><p>
                                                </p></div>
                                                <div className="price">Price : Rp.990.000</div>
                                                <div className="Total"><b>Sub Total : Rp.990.000</b></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="recent-trx-card-right">
                                        <h2>Success</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;