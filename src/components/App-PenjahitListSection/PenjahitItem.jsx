import React, { useEffect, useRef, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLED } from "../../slice/toggleSlice";
import { SELECT_ITEM } from "../../slice/selectItemSlice";
import { data } from "autoprefixer";

function PenjahitItem(props) {
  const baseStar = [];
  const navigate = useNavigate();
  baseStar.length = props.rating ? props.rating : 0;

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);
  return (
    <div
      className="flex justify-evenly w-96 mx-auto gap-5 bg-white py-3 px-1 shadow-md"
      onClick={() => navigate(`detail/${props.id}`)}
    >
      <img
        src={"https://api.jahitkeeun.my.id/photo-user/" + props.foto}
        className="w-1/4 object-cover md:w-1/3"
      />
      <div className="flex flex-col gap-2 w-full">
        <p className="font-bold text-xl md:text-2xl">{props.nama}</p>
        <p>{props?.distrik || props?.namaservis}</p>
        {props.price && (
          <NumericFormat
            value={props.price}
            className="bg-transparent"
            thousandSeparator=","
            prefix={"Rp."}
          />
        )}
        <p className="flex">
          {baseStar.length > 0 && (
            <>
              {[...Array(baseStar.length)].map((e, i) => {
                return <AiFillStar key={i} />;
              })}
            </>
          )}
          {baseStar.length < 1 && <p className="text-sm">Belum ada rating</p>}
        </p>
      </div>
    </div>
  );
}

export default PenjahitItem;

export function DetailTaylor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState();
  const [taylorid, settaylorid] = useState();
  const [tayloritem, setTayloritem] = useState([]);
  const isLoading = useRef(true);
  const itemLoading = useRef(true);
  const token = sessionStorage.getItem("token");
  const baseStar = [];
  const [showServ, setShowServ] = useState(false);
  const { toggle } = useSelector((state) => state.toggle);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/taylor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetail(response.data.meta.message.data[0]);
      settaylorid(response.data.meta.message.data[0].taylor_id);
      getItems(response.data.meta.message.data[0].taylor_id)
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async (id) => {
    try {
      const response = await axios.get(
        `http://api.jahitkeeun.my.id/api/sectionitem/taylorId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTayloritem(response.data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      itemLoading.current = false;
    }
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getDetail();
      isLoading.current = false;
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="h-screen bg-slate-200">
      <div className="w-screen md:w-[30.375rem] mx-auto pb-32 bg-[#FFF8EA] overflow-y-scroll h-screen">
        {toggle && <ServiceDetail />}
        <div className="flex items-center mt-5 ml-5 gap-4">
          <button
            className="bg-[#402E32] text-zinc-50 rounded-md py-3 px-3"
            onClick={() => navigate("../home")}
          >
            <IoIosArrowBack className="text-3xl" />
          </button>
          <p className="text-xl font-semibold">Detail Penjahit</p>
        </div>
        {isLoading.current && <p className="text-center">Loading...</p>}
        {isLoading.current === false && (
          <>
            <div className="flex my-4 px-5 gap-3">
              <span className="hidden"></span>
              <img
                src={
                  "https://apijahitkeeun.tepat.co.id/photo-user/" +
                  detail?.taylor_photo
                }
                className="w-1/3"
                alt=""
              />
              <div className="flex flex-col justify-around">
                <p className="font-semibold text-xl">{detail.taylor_name}</p>
                <p>{detail.districtName}</p>
                <p className="flex gap-1 items-center">
                  Bintang {detail.rating}
                  {/* {baseStar.length > 0 && (
                    <>
                      {[...Array(baseStar.length)].map((e, i) => {
                        return <AiFillStar key={i} />;
                      })}
                    </>
                  )}
                  {baseStar.length < 1 && (
                    <p className="text-sm">Belum ada rating</p>
                  )} */}
                  <p className="text-xs">
                    (
                    {detail.completed_transaction
                      ? detail.completed_transaction
                      : "Belum ada transaksi"}
                    )
                  </p>
                </p>
              </div>
            </div>
            <div className="flex justify-evenly gap-2 px-4">
              <button className="bg-[#402E32] text-zinc-50 py-2 px-3 w-full rounded-md" onClick={()=>window.location.href = `https://wa.me/${detail.taylor_phone}`}>
                Chat
              </button>
              <button className="bg-zinc-50 text-[#402e32] py-2 px-3 border-[#402e32] border w-full rounded-md">
                Lihat Portofolio
              </button>
            </div>
            <div className="px-4 mt-4">
              <button className="bg-[#F1C232] text-[#402e32] py-3 font-semibold px-3 w-full rounded-md" onClick={()=>navigate(`../home/detail/order/${detail.taylor_id}`)}>
                PESAN JASA
              </button>
            </div>
            <div className="px-4 py-4">
              <p className="font-semibold text-2xl my-3">
                Jasa {detail.taylor_name}
              </p>
              <div className="flex flex-col gap-2">
                {itemLoading.current && <p className="text-center">Loading...</p>}
                {itemLoading.current === false && (
                  <>
                    {tayloritem.map((v, i) => {
                      return (
                        <ItemsDetail
                          key={i}
                          taylorId={taylorid}
                          name={v.itemName}
                          id={v.itemId}
                          foto={v.itemPhoto}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ItemsDetail(props) {
  const dispatch = useDispatch();
  const showService = () => {
    dispatch(TOGGLED(true));
    dispatch(
      SELECT_ITEM({
        taylorId: props.taylorId,
        itemId: props.id,
      })
    );
  };
  return (
    <div
      className="flex items-center font-semibold gap-2 px-4"
      onClick={showService}
    >
      <img
        src={"https://apijahitkeeun.tepat.co.id/photo-item/" + props.foto}
        className="w-10 bg-[#402e32] rounded-md py-1 px-1"
        alt="item-image"
      />
      <p className="flex-1 text-xl">{props.name}</p>
      <MdKeyboardArrowRight />
    </div>
  );
}

function ServiceDetail() {
  const { taylorId, itemId } = useSelector((state) => state.selectItem);
  const [service, setService] = useState([]);
  const [selected, setSelected] = useState('')
  const tylrId = taylorId;
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const isLoading = useRef(true);

  const getService = async () => {
    try {
      const response = await axios.get(
        `http://apijahitkeeun.tepat.co.id/api/sectionitem/taylorId/${tylrId}/itemId/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setService(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (id) =>{
    setSelected();
  }

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      getService();
      isLoading.current = false;
    }
  }, []);

  console.log(selected);
  return (
    <>
      <div className="absolute h-screen w-screen">
        <div
          className="bg-black/75 h-full relative w-full"
          onClick={() => dispatch(TOGGLED(false))}
        >
        </div>
        <div className="flex absolute top-5 left-9 gap-3 flex-col bg-white py-5 px-5 h-96 w-80 overflow-y-scroll">
            <p className="text-xl font-bold mb-3">List Service</p>
            {isLoading.current && <p className="text-center">Memuat...</p>}
            {isLoading.current === false && service.length < 1 && <p>Data Kosong</p>}
            {isLoading.current === false && (
              <>
                {service.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col border border-black rounded-md px-3 py-3"
                      onClick={()=> selected.includes(v.serviceId) ? deleteItem() : setSelected(v.serviceId)}
                      style={{border: selected.includes(v.serviceId) ? '2px solid #000' : '1px solid #000', backgroundColor:selected.includes(v.serviceId) ? '#000' : '', color: selected.includes(v.serviceId) ? '#fff' : '#000'}}
                    >
                      <p className="text-2xl">{v.serviceName}</p>
                      <NumericFormat
                      className="bg-transparent"
                      displayType="text"
                        value={v.price}
                        prefix={"Rp."}
                        thousandSeparator=","
                      />
                    </div>
                  );
                })}
              </>
            )}
            {selected && (
              <>
              <button className="bg-white border border-black">Tambahkan ke Cart</button>
              </>
            )}
          </div>
      </div>
    </>
  );
}
