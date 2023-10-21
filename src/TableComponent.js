// TableComponent.js
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';


const TableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/table/efotermstable');
            console.log(response.data.results);
            setData(response.data.results);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Term ID',
            dataIndex: 'term_id',
            key: 'term_id',
        },
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'IRI',
            dataIndex: 'iri',
            key: 'iri',
            render: (iri) => <a href={iri} target="_blank" rel="noopener noreferrer">{iri}</a>,
        },
        {
            title: 'Synonyms',
            dataIndex: 'synonyms',
            key: 'synonyms',
            render: synonyms => <div>{synonyms.join(', ')}</div>,
        },
        {
            title: 'Description',
            dataIndex: 'descriptions',
            key: 'descriptions',
            render: descriptions => <div>{descriptions.join(', ')}</div>,
        },
        {
            title: 'Parents',
            dataIndex: 'parents',
            key: 'parents',
            render: (text, record) => (
                <a onClick={() => handleParentClick(record.id)}>View Parents</a>
            ),
        },
        {
            title: 'Children',
            dataIndex: 'children',
            key: 'children',
            render: (text, record) => (
                <a onClick={() => handleChildrenClick(record.id)}>View Children</a>
            ),
        },
    ];

    const handleParentClick = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/table/efotermstable/${id}/parents`);
            setData(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleChildrenClick = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/table/efotermstable/${id}/children`);
            setData(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
        />
    );
};

export default TableComponent;

