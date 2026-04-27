import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import logo from "../images/logo.svg";
import kar from "../images/karzina.svg";
import user from "../images/user.svg";
import send from "../images/send.svg";
import facebook from "../images/facebook.svg";
import twitter from "../images/twitter.svg";
import instagram from "../images/instagram.svg";
import linkedin from "../images/linkedin.svg";
import { Zustandlogic } from "../store/Zuntand";
import { GetDecodedToken, GetToken, GetUserName } from "../utils/token";

const Leaut = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const logoutUser = Zustandlogic((state: any) => state.logoutUser);
  const cart = Zustandlogic((state: any) => state.cart);
  const getCart = Zustandlogic((state: any) => state.getCart);

  const [like, setLike] = useState<number[]>([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [isAuth, setIsAuth] = useState(!!GetToken());
  const [userName, setUserName] = useState(GetUserName());

  useEffect(() => {
    const readLike = () => {
      const saved = localStorage.getItem("like");
      setLike(saved ? JSON.parse(saved) : []);
    };

    const updateAuth = () => {
      setIsAuth(!!GetToken());
      setUserName(GetUserName());
    };

    readLike();
    updateAuth();

    window.addEventListener("authUpdated", updateAuth);
    window.addEventListener("wishlistUpdated", readLike);
    window.addEventListener("storage", readLike);

    return () => {
      window.removeEventListener("authUpdated", updateAuth);
      window.removeEventListener("wishlistUpdated", readLike);
      window.removeEventListener("storage", readLike);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("like");
    setLike(saved ? JSON.parse(saved) : []);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth) {
      getCart();
    }
  }, [isAuth]);

  const cartCount = useMemo(() => {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((acc: number, item: any) => {
      return acc + Number(item.quantity || item.productInMyCart?.quantity || 1);
    }, 0);
  }, [cart]);

  function handleLogout() {
    logoutUser();
    setOpenProfile(false);
    navigate("/login");
  }

  function changeLanguage(lang: string) {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  }

  function activeLink({ isActive }: any) {
    return isActive
      ? "text-[16px] font-[400] text-black border-b border-black pb-1"
      : "text-[16px] font-[400] text-black";
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-sm">
        <div className="max-w-[1400px] mx-auto h-[94px] px-4 sm:px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8 xl:gap-[140px]">
            <Link to="/">
              <img src={logo} alt="" className="w-[120px] sm:w-[140px]" />
            </Link>

            <nav className="hidden md:flex items-center gap-8 xl:gap-12">
              <NavLink to="/" className={activeLink}>
                {t("nav.home")}
              </NavLink>

              <NavLink to="/category" className={activeLink}>
                {t("nav.category")}
              </NavLink>

              <NavLink to="/contact" className={activeLink}>
                {t("nav.contact")}
              </NavLink>

              <NavLink to="/about" className={activeLink}>
                {t("nav.about")}
              </NavLink>

              {!isAuth && (
                <NavLink to="/signup" className={activeLink}>
                  {t("nav.signup")}
                </NavLink>
              )}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-5 xl:gap-6">
            <div className="w-[220px] lg:w-[260px] xl:w-[280px] h-[42px] bg-[#F5F5F5] rounded-[6px] px-4 flex items-center justify-between border border-transparent focus-within:border-[#DB4444] duration-200">
              <input
                type="text"
                placeholder={t("nav.search")}
                className="w-full bg-transparent outline-none text-[12px] font-[400] placeholder:text-black"
              />
              <span className="text-[18px] text-black">⌕</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={localStorage.getItem("lang") || "en"}
                onChange={(e) => changeLanguage(e.target.value)}
                className="h-[38px] px-3 border border-[#DBDBDB] rounded-[4px] outline-none bg-white text-[14px]"
              >
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="tj">TJ</option>
              </select>
            </div>

            <div className="flex items-center gap-4 xl:gap-5">
              {isAuth && (
                <>
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="relative cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={like.length ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`size-6 duration-200 ${
                        like.length ? "text-red-500" : "text-black"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>

                    {like.length > 0 && (
                      <span className="absolute -top-1 -right-2 w-[17px] h-[17px] rounded-full bg-[#DB4444] text-white text-[10px] flex items-center justify-center">
                        {like.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                  >
                    <img src={kar} alt="" className="w-[27px] h-[27px]" />

                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 w-[17px] h-[17px] rounded-full bg-[#DB4444] text-white text-[10px] flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setOpenProfile(!openProfile)}
                      className={`min-w-[42px] h-[42px] rounded-full flex items-center justify-center duration-200 px-2 ${
                        openProfile ? "bg-[#DB4444]" : "bg-transparent"
                      }`}
                    >
                      <img
                        src={user}
                        alt=""
                        className={`w-[25px] h-[25px] ${
                          openProfile ? "brightness-0 invert" : ""
                        }`}
                      />
                    </button>

                    {openProfile && (
                      <div className="absolute top-[56px] right-0 w-[240px] rounded-[4px] overflow-hidden bg-black/80 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-[200]">
                        <div className="px-6 py-4 border-b border-white/10 text-[15px]">
                          {userName || "User"}
                        </div>

                        <button
                          onClick={() => {
                            const decoded: any = GetDecodedToken();
                            const id = decoded?.sid || а;
                            decoded?.nameid || decoded?.id || "";

                            setOpenProfile(false);

                            if (id) {
                              navigate(`/account/${id}`);
                            } else {
                              navigate("/login");
                            }
                          }}
                          className="w-full h-[58px] px-6 flex items-center gap-4 text-[16px] font-[400] hover:bg-white/10 duration-200"
                        >
                          My Account
                        </button>

                        <button
                          onClick={() => {
                            setOpenProfile(false);
                            navigate("/checkout");
                          }}
                          className="w-full h-[58px] px-6 flex items-center gap-4 text-[16px] font-[400] hover:bg-white/10 duration-200"
                        >
                          Checkout
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full h-[58px] px-6 flex items-center gap-4 text-[16px] font-[400] hover:bg-white/10 duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {!isAuth && (
                <button
                  onClick={() => navigate("/login")}
                  className="h-[42px] px-5 bg-[#DB4444] text-white rounded-[4px]"
                >
                  {t("auth.loginBtn")}
                </button>
              )}
            </div>
          </div>

          <button className="md:hidden text-[24px]">☰</button>
        </div>
      </header>

      <main className="min-h-[70vh] max-w-[1400px] mx-auto px-4 sm:px-6 pt-[120px]">
        <Outlet />
      </main>

      <footer className="bg-black text-white mt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2A2A2A]">
            <div>
              <h2 className="text-[24px] font-[700] mb-6">Exclusive</h2>
              <p className="text-[20px] font-[500] mb-6">
                {t("footer.subscribe")}
              </p>
              <p className="text-[16px] font-[400] mb-4">
                {t("footer.discount")}
              </p>

              <div className="w-full max-w-[217px] h-[48px] border border-white rounded-[4px] px-4 flex items-center justify-between">
                <input
                  type="text"
                  placeholder={t("footer.enterEmail")}
                  className="bg-transparent outline-none text-[16px] w-full placeholder:text-[#7D7D7D]"
                />
                <img src={send} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">
                {t("footer.support")}
              </h2>
              <p className="text-[16px] font-[400] leading-[24px] mb-4">
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p className="text-[16px] font-[400] mb-4">exclusive@gmail.com</p>
              <p className="text-[16px] font-[400]">+88015-88888-9999</p>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">
                {t("footer.account")}
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] font-[400]">{t("footer.account")}</p>
                <p className="text-[16px] font-[400]">{t("footer.cart")}</p>
                <p className="text-[16px] font-[400]">{t("footer.wishlist")}</p>
                <p className="text-[16px] font-[400]">{t("footer.shop")}</p>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">
                {t("footer.quickLink")}
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] font-[400]">{t("footer.privacy")}</p>
                <p className="text-[16px] font-[400]">{t("footer.terms")}</p>
                <p className="text-[16px] font-[400]">{t("footer.faq")}</p>
                <p className="text-[16px] font-[400]">{t("footer.contact")}</p>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">
                {t("footer.social")}
              </h2>
              <div className="flex items-center gap-6">
                <img src={facebook} alt="" className="w-[24px] h-[24px]" />
                <img src={twitter} alt="" className="w-[24px] h-[24px]" />
                <img src={instagram} alt="" className="w-[24px] h-[24px]" />
                <img src={linkedin} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-center">
            <p className="text-[#7D7D7D] text-[16px] font-[400]">
              © Copyright Rimel 2022. All right reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Leaut;
