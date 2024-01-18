import preloaderStyle from './preloader.module.css';

const Preloader = () => {
    return (
        <div className={preloaderStyle.preloader}>
            <div className={preloaderStyle.loader}></div>
        </div>
    )
}

export default Preloader;