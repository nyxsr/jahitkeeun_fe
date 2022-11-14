import { MenuNav, NavWrapper, ToggleNav } from "./style";
import logo from "../../assets/logo.svg";
import { BiMenu, BiLogInCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLED } from "../../slice/toggleSlice";

function Navbar() {
  //   const [toggled, setToggle] = useState(false);
  const { toggle } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  // console.log(toggle)
  return (
    <>
      <NavWrapper>
        <img src={logo} alt="logo-jahitkeeun" />
        <div className="hidden lg:flex gap-5 -mt-5">
          <NavLink to="/">Home</NavLink>
          <a>Tentang Kami</a>
          <a>Cara Bergabung ?</a>
          <a>Kontak Kami</a>
        </div>
        <div className="hidden lg:flex gap-5 -mt-5">
          <NavLink
            className="border-zinc-800 border-2 px-7 py-2 rounded-md"
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className="border-zinc-800 border-2 px-5 py-2 rounded-md"
            to="/register"
          >
            Register
          </NavLink>
        </div>
        <ToggleNav>
          <BiMenu
            onClick={() =>
              !toggle ? dispatch(TOGGLED(true)) : dispatch(TOGGLED(false))
            }
          />
        </ToggleNav>
      </NavWrapper>
      <div className="absolute w-full">
        {toggle && <MenuToggle />}
        <NavTab/>
      </div>
    </>
  );
}

export default Navbar;

const MenuToggle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homeClicked = () =>{
    navigate('/')
    dispatch(TOGGLED(false))
  }

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
        >
          Kontak Kami
        </motion.a>
      </MenuNav>
    </AnimatePresence>
  );
};

const NavTab = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed lg:hidden bottom-0 left-0 right-0 bg-zinc-50 py-5 px-5">
      <div className="flex justify-evenly">
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="flex flex-col text-2xl font-semibold items-center"
          onClick={() => navigate("/login")}
        >
          <BiLogInCircle className="text-3xl" />
          <p>Login</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="flex flex-col text-2xl font-semibold items-center"
          onClick={() => navigate("/register")}
        >
          <FaUserEdit className="text-3xl" />
          <p>Register</p>
        </motion.div>
      </div>
    </div>
  );
};
