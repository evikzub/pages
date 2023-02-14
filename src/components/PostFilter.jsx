import React from "react";
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {

    //const [searchQuery, setSearchQuery] = useState('');
    //const [selectedSort, setSelectedSort] = useState("");

    return (
        <div>
            <MyInput 
                placeholder="Search..."
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect 
                defaultValue="Order"
                value={filter.sort}
                // selectedSort ?
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value:'title', name: 'By Name'},
                    {value:'body', name: 'By Description'},
                ]}
            />
        </div>

    )
}

export default PostFilter;