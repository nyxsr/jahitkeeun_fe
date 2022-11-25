import { MenuNav, NavWrap } from "./style";
import logo from "../../assets/logo.svg";
import logowhite from '../../assets/logo-white.svg'
import { BiMenu, BiLogInCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLED } from "../../slice/toggleSlice";
import { IS_AUTH } from "../../slice/isAuthSlice";
import { IN_NAVBAR_APP } from "../../slice/inNavbarApp";

function Navbar() {

  const { toggle } = useSelector((state) => state.toggle);
  const { isAuth } = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  let isAuthSelected = localStorage.getItem("isAuthSelected");
  let inNavbarApp = sessionStorage.getItem('inNavbarApp');

  const authHome = () => {
    dispatch(IS_AUTH(0))
    isAuthSelected = localStorage.getItem("isAuthSelected");
    window.location.href = '/'
    console.log(isAuthSelected)
  };

  if (isAuthSelected === '1' && !inNavbarApp) {
    return (
      <>
      <NavWrap className="flex items-center px-5 lg:px-14" auth>
        <Link onClick={authHome}>
          <img src={logo} alt="logo-jahitkeeun" />
        </Link>
      </NavWrap>
      </>
    );
  } else if(isAuthSelected ==='0') {
    return (
      <>
        <div className="fixed lg:static w-screen z-50">
          <NavWrap className="flex items-center px-5 lg:px-14">
            <Link to="/" onClick={authHome}>
              <img src={logo} alt="logo-jahitkeeun" />
            </Link>
            <div className="hidden lg:flex gap-5 -mt-5">
              <NavLink to="/">Home</NavLink>
              <a href="#about">Tentang Kami</a>
              <a href="#join">Cara Bergabung ?</a>
              <a href="#kontak">Kontak Kami</a>
            </div>
            <div className="hidden lg:flex gap-5 -mt-5">
              <NavLink
                className="border-zinc-800 border-2 px-7 py-2 rounded-md"
                to="/login"
                onClick={() => dispatch(IS_AUTH(1))}
              >
                Login
              </NavLink>
              <NavLink
                className="border-zinc-800 border-2 px-5 py-2 rounded-md"
                to="/register"
                onClick={() => dispatch(IS_AUTH(1))}
              >
                Register
              </NavLink>
            </div>
            <div className="lg:hidden border rounded-sm text-3xl -mt-5">
              <BiMenu
                onClick={() =>
                  !toggle ? dispatch(TOGGLED(true)) : dispatch(TOGGLED(false))
                }
              />
            </div>
          </NavWrap>
          <div className="absolute w-full z-50">
            {toggle && <MenuToggle />}
            <NavTab />
          </div>
        </div>
      </>
    );
  } else if(isAuthSelected === '1' && inNavbarApp === 'true' ){
    return(
      <NavWrap className="flex items-center px-5 lg:px-14 z-50" auth app>
        <Link onClick={authHome}>
          <img className="-mb-3" src={logowhite} alt="logo-jahitkeeun" />
        </Link>
      </NavWrap>
    )
  }
}

export default Navbar;

const MenuToggle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isAuthSelected = localStorage.getItem("isAuthSelected");


  const homeClicked = () => {
    dispatch(IS_AUTH(0))
    isAuthSelected = localStorage.getItem("isAuthSelected");
    navigate("/");
    dispatch(TOGGLED(false));
  };

  return (
    <AnimatePresence>
      <MenuNav>
        <motion.a
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -15, opacity: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 10,
            delay: 0.1,
          }}
          whileHover={{ paddingLeft: "30px" }}
          whileTap={{ paddingLeft: "30px", scale: 1.1 }}
          onClick={homeClicked}
        >
          Home
        </motion.a>
        <motion.a
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -15, opacity: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 10,
            delay: 0.2,
          }}
          whileHover={{ paddingLeft: "30px" }}
          whileTap={{ paddingLeft: "30px", scale: 1.1 }}
          href="/#about"
          onClick={() => dispatch(TOGGLED(false))}
        >
          Tentang Kami
        </motion.a>
        <motion.a
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -15, opacity: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 10,
            delay: 0.3,
          }}
          whileHover={{ paddingLeft: "30px" }}
          whileTap={{ paddingLeft: "30px", scale: 1.1 }}
          href="#join"
          onClick={() => dispatch(TOGGLED(false))}
        >
          Cara Bergabung ?
        </motion.a>
        <motion.a
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -15, opacity: 0 }}
          transition={{
            duration: 0.2,
            type: "spring",
            damping: 10,
            delay: 0.4,
          }}
          whileHover={{ paddingLeft: "30px" }}
          whileTap={{ paddingLeft: "30px", scale: 1.1 }}
          href="#kontak"
          onClick={() => dispatch(TOGGLED(false))}
        >
          Kontak Kami
        </motion.a>
      </MenuNav>
    </AnimatePresence>
  );
};

const NavTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let isAuthSelected = localStorage.getItem("isAuthSelected");

  const loginClicked = () =>{
    dispatch(IS_AUTH(1))
    dispatch(IN_NAVBAR_APP(true))
    isAuthSelected = localStorage.getItem("isAuthSelected");
    navigate('/login')
  }

  const registerClicked = () =>{
    dispatch(IS_AUTH(1))
    isAuthSelected = localStorage.getItem("isAuthSelected");
    navigate('/register')
  }

  return (
    <div className="fixed lg:hidden bottom-0 left-0 right-0 bg-zinc-50 py-3 px-3">
      <div className="flex justify-evenly">
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="flex flex-col text-2xl font-semibold items-center"
          onClick={loginClicked}
        >
          <BiLogInCircle className="text-2xl text-[#F1C232]" />
          <p className="text-xl">Login</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="flex flex-col text-2xl font-semibold items-center"
          onClick={registerClicked}
        >
          <FaUserEdit className="text-2xl text-[#F1C232]" />
          <p className="text-xl">Register</p>
        </motion.div>
      </div>
    </div>
  );
};

export function NavApp() {
  return(
    <NavWrap className="flex items-center px-5 lg:px-14" app auth>
    <input type="text" className="bg-white" />
  </NavWrap>
  )
}
