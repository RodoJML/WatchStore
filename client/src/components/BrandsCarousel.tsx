export default function BrandsCarousel(){
    
    const mobilewidthBrands = "w-100 ";
    const smwidthBrands = "sm:w-130 ";
    const brandsStyle = `mr-5 flex justify-center items-center ${mobilewidthBrands} ${smwidthBrands}`;

    return(
        <div className="flex items-center justify-center overflow-hidden -mx-3 opacity-60">
                    <div className="wrapper flex relative overflow-hidden">
                        <div className="track flex">
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand18.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand02.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand11.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand03.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand12.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand04.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand13.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand05.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand14.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand22.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand06.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand15.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand20.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand07.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand16.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand08.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand21.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand17.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand09.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand18.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand10.png" alt="" /></div>
                            <div className={`${brandsStyle}`}><img src="/src/assets/images/brands/brand23.png" alt="" /></div>
                        </div>
                    </div>
                </div>
    );
}