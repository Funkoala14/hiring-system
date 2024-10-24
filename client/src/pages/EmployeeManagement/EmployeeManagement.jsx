import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeList } from '../../store/employeeSlice/employee.thunk';
import { clearSearch, setBaseQuery, setFilteredList } from '../../store/searchSlice/search.slice';
import Loading from '../../components/Loading';

const EmployeeManagement = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.employee);
    const { query, filteredList } = useSelector((state) => state.search);

    useEffect(() => {
        const fetchList = async () => {
            await dispatch(fetchEmployeeList());
        };

        fetchList();
    }, [dispatch]);

    useEffect(() => {
        if (list) {
            dispatch(setFilteredList(list));
            setNameSet();
        }
    }, [list]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const setNameSet = async () => {
        const nameSet = new Set();
        await list.forEach((employee) => {
            if (employee.preferredName) {
                nameSet.add(employee.preferredName);
            }
            if (employee.firstName) {
                nameSet.add(employee.firstName);
            }
            if (employee.lastName) {
                nameSet.add(employee.lastName);
            }
        });
        const uniqueNamesArray = Array.from(nameSet);

        dispatch(setBaseQuery(uniqueNamesArray));
    };

    const handleReset = () => {
        dispatch(clearSearch(list));
    };

    const handleSearch = () => {
        const results = list.filter(
            (item) =>
                item.firstName?.toLowerCase().includes(query.toLowerCase()) ||
                item.lastName?.toLowerCase().includes(query.toLowerCase()) ||
                item.preferredName?.toLowerCase().includes(query.toLowerCase())
        );
        console.log(results);

        dispatch(setFilteredList(results));
    };

    return (
        <section className='flex-col g-1 align-start'>
            <header>
                <h1 className='title'>Employee Management</h1>
            </header>
            <SearchBar handleReset={handleReset} handleSearch={handleSearch} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Social Security #</TableCell>
                            <TableCell>Work Authorization</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.length ? (
                            filteredList.map((row) => (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        <Link href={`/hr/employee-profile?username=${row.username}`}>
                                            {row.firstName}
                                            {row.middleName ? ` ${row.middleName} ` : ' '}
                                            {row.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.ssn}</TableCell>
                                    <TableCell>{row.workauth}</TableCell>
                                    <TableCell>{row.cellPhone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow sx={{ textAlign: 'center' }}>
                                <TableCell colSpan={5} align='center'>
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
};

export default EmployeeManagement;
