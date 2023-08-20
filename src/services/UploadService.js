import React, {useState, useRef, useCallback, useMemo} from "react";
import "../styles/UploadService.scss";
import {FormErr} from "../components/FormErr";
import {useDispatch} from "react-redux";
import {addProducts} from "../features/products/ProductsSlice";
import {initialProducts} from "../db/data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function About(props) {
    return !props.state ? ("") : (<p>
        : {props.symbol} {props.state} {props.texts}
    </p>);
}

export default function UploadService() {
    const dispatch = useDispatch();
    const [requestStatus, setRequestStatus] = useState("idle");
    const [product, setProduct] = useState(initialProducts);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [files, setFiles] = useState([]);

    const stars = [...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (<label className="border border-black" key={index}>
            <input
                type={"radio"}
                style={{display: "none"}}
                onClick={(c) => setRating(ratingValue)}
                value={ratingValue}
                name={"rating"}
            />
            <FontAwesomeIcon
                icon={faStar}
                className={"cursor-pointer"}
                color={ratingValue <= (hover || rating) ? "yellow" : "gray"}
                onMouseEnter={(c) => setHover(ratingValue)}
                onMouseLeave={(c) => setHover(0)}
            />
        </label>);
    });


    const handleFile = (e) => {
        if (!e.target.files && !e.target.files[0]) return;

        const reader = new FileReader();
        reader.onloadend = (e) => {
            setFiles([...files, {image: e.target.result}]);

            console.log(files);
        };

        reader.readAsDataURL(e.target.files[0]);

        console.log(files.length);
    };

    const handleText = (e) => {
        return setProduct({...product, [e.target.name]: e.target.value});
    };

    const canSave = [product].every(Boolean) && requestStatus === "idle";

    const submit = async () => {
        const fileArr = JSON.stringify(files);
        const formData = new FormData();

        formData.append("images", fileArr);
        formData.append("brand", product.brand.toLowerCase());
        formData.append("title", product.title.toLowerCase());
        formData.append("stars", rating);
        formData.append("color", product.color.toLowerCase());
        formData.append("software", product.software.toLowerCase());
        formData.append("year", product.year);
        formData.append("rom", product.rom);
        formData.append("ram", product.ram);
        formData.append("condition", product.condition.toLowerCase());
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);

        if (!canSave) return <>Failed</>;

        try {
            dispatch(addProducts(formData)).unwrap();

            setProduct({
                ...product, initialProducts,
            });
            setRating(0);
            setHover(0);

        } catch (err) {
            console.log(err);
        } finally {
            setRequestStatus("idle");
        }
    };


    return (<section className="w-full h-full border-black flex justify-between overflow-hidden ">

        <article className="file-preview border border-red-600 w-2/4 h-full  hidden">


            <div className="product">
                <About state={product.brand}/>
                <About state={product.title}/>
                <About state={product.color}/>
                <About state={product.software}/>
                <About state={product.year}/>
                <About state={product.rom} texts={"gb"}/>
                <About state={product.ram} texts={"gb"}/>
                <About state={product.condition}/>
                <About symbol={"$"} state={product.price}/>
                <About state={product.quantity} texts={"pcs"}/>
            </div>
        </article>
        {/*IMAGE PREVIEW CONTAINER  */}

        <div className={"border border-black flex w-[30%] h-full overflow-hidden"}>

                        {files.map((item, idx) => {
                            return (
                                <figure className={"w-[100px] h-[100px]"} key={idx}>
                                    <img className={"object-contain w-[100px] h-[100px]"} src={item.image} alt={item.title}/>
                                </figure>
                            )
                        })}

        </div>

        <article
            className="form-box border
      border-black w-3/5"
        >
            <form
                onSubmit={submit}
                encType={"multipart/form-data"}
                className={"post-form w-100 h-full "}
            >
                <label>Select image file for upload</label>
                <br/>
                <input
                    type={"file"}
                    accept="image/*"
                    onChange={handleFile}
                    value={product.images}
                    multiple
                />
                <br/>
                <label>enter phone manufacturer i.e samsung, iphone.....</label>
                <br/>
                <input
                    placeholder="brand"
                    type={"text"}
                    onChange={handleText}
                    name={"brand"}
                    value={product.brand}
                />
                <FormErr/>

                <input
                    placeholder="phone name"
                    type={"text"}
                    onChange={handleText}
                    name={"title"}
                    value={product.title}
                />
                <label>{stars}</label>

                <input
                    placeholder={"color"}
                    type={"text"}
                    onChange={handleText}
                    name={"color"}
                    value={product.color}
                />
                <br/>

                <label>software</label>
                <br/>

                <select
                    name="software"
                    onChange={handleText}
                    value={product.software}
                >
                    <option value={""}></option>
                    <option>android</option>
                    <option>ios</option>
                </select>

                <input

                    type={"number"}
                    onChange={handleText}
                    name={"year"}
                    value={product.year}
                    placeholder={"item manufacture date"}
                />
                <input

                    type={"number"}
                    onChange={handleText}
                    name={"rom"}
                    value={product.rom}
                    placeholder={"internal storage"}
                />
                <input

                    type={"number"}
                    onChange={handleText}
                    name={"ram"}
                    value={product.ram}
                    placeholder={"ram memory"}
                />
                <input

                    type={"text"}
                    onChange={handleText}
                    name={"condition"}
                    value={product.condition}
                    placeholder={"is item refurbished or brand new"}
                />

                <input

                    type={"number"}
                    onChange={handleText}
                    name={"price"}
                    value={product.price}
                    placeholder={"how much item cost"}
                />

                <input

                    type={"number"}
                    onChange={handleText}
                    name={"quantity"}
                    value={product.quantity}
                    placeholder={"how many items"}
                />
                <br/>
                <button
                    className={"post-btn border border-black w-2/4"}
                    type="submit"
                    disabled={!canSave}
                >
                    post
                </button>
            </form>
        </article>
    </section>);
}
