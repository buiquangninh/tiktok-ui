import {useEffect, useState, useRef} from 'react';
import classNames from 'classnames/bind';
import Headless from '@tippyjs/react/headless';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark, faSpinner} from '@fortawesome/free-solid-svg-icons';

import * as searchServices from '~/apiServices/searchServices';
import styles from './Search.module.scss';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import {SearchIcon} from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import {useDebounce} from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);

            setLoading(false);
        }
        fetchApi()
        setLoading(true);

    }, [debounced]);

    const handleClear = (e) => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <Headless
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1">
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {
                            searchResult.map(result => (
                                <AccountItem key={result.id} data={result}/>
                            ))
                        }
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark}/>
                    </button>
                )}
                {
                    loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>
                }
                <button className={cx('search-btn')}>
                    <SearchIcon/>
                </button>
                <div className={cx('input-border')}></div>
            </div>
        </Headless>
    );
}

export default Search;
