import style from '../Loader/Loader.module.css'
function Loader() {
    return (<div className={style['loader']}>
        <h1 className={style['title']}>Возникли проблемки...<img src="/loader.gif" alt="loader" /></h1>
        <div className={style['call']}>Напиши мне: {''}
            <a href="https://t.me/xenia_golb">
                <img src="/t.svg" alt="telegram" />
            </a>
        </div>

    </div>)
}

export default Loader;