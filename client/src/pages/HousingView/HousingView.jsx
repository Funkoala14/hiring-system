import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectHousingByTitle } from '../../store/housingSlice/housing.selectors';
import {
    Breadcrumbs,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getReportList } from '../../store/housingSlice/housing.thunk';

const HousingView = ({ parent }) => {
    const navigate = useNavigate();
    const [housing, setHousing] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const title = queryParams.get('title');

    const house = useSelector(selectHousingByTitle(title));
    const { housingAssignment } = useSelector((state) => state.profile.info);
    const houseId = house?._id || housingAssignment?._id;

    useEffect(() => {
        if (parent === 'hr' && title) {
            // Use the selector to find the housing item by title
            setHousing(house);
        } else if (parent === 'employee') {
            setHousing(housingAssignment);
        }
    }, [parent]);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section>
            <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '16px 0' }}>
                <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: 'pointer' }}>
                    Go Back
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Housing Detail</Typography>
            </Breadcrumbs>
            {housing ? (
                <div className='flex-col g-1'>
                    <HousingDetail housing={housing} />
                    <HousingFaicilityReport houseId={houseId} />
                </div>
            ) : (
                <div>Housing item not found.</div>
            )}
        </section>
    );
};

const HousingDetail = ({ housing }) => {
    return (
        <div className='housing-detail outlined-container'>
            <header>
                <h1 className='title'>{housing.title}</h1>
            </header>
            <Typography variant='h5' sx={{ m: '1rem 0', borderBottom: '1px solid #aaa' }}>
                Address
            </Typography>
            <div className='view-container' sx={{ p: '1rem' }}>
                <label className='view-item'>
                    Building/Apartment #<span>{housing?.address?.building}</span>
                </label>
                <label className='view-item'>
                    Street
                    <span>{housing?.address?.street}</span>
                </label>
                <label className='view-item'>
                    City<span>{housing?.address?.city}</span>
                </label>
                <label className='view-item'>
                    State<span>{housing?.address?.state}</span>
                </label>
                <label className='view-item'>
                    Zipcode<span>{housing?.address?.zip}</span>
                </label>
            </div>
            <Typography variant='h5' sx={{ m: '1rem 0', borderBottom: '1px solid #aaa' }}>
                Landlord
            </Typography>
            <div className='view-container'>
                <label className='view-item'>
                    Landloard Legal Full Name
                    <span>{housing?.landlord?.name}</span>
                </label>
                <label className='view-item'>
                    Landloard Phone Number
                    <span>{housing?.landlord?.phone}</span>
                </label>
                <label className='view-item'>
                    Landloard Email Address
                    <span>{housing?.landlord?.email}</span>
                </label>
            </div>
            <Typography variant='h5' sx={{ m: '1rem 0', borderBottom: '1px solid #aaa' }}>
                Residents
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {housing.residents.length ? (
                            housing.residents.map((row) => (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {parent === 'hr' ? (
                                            <Link href={`/hr/employee-profile?username=${row.username}`}>
                                                {row.preferedName || row.firstName} {row.lastName}
                                            </Link>
                                        ) : (
                                            `${row.preferedName || row.firstName} ${row.lastName}`
                                        )}
                                    </TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow sx={{ textAlign: 'center' }}>
                                <TableCell colSpan={5} align='center'>
                                    No residents
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const HousingFaicilityReport = ({ houseId }) => {
    const dispatch = useDispatch();
    const [currPage, setPage] = useState(1);
    const { facilityReports, page, limit, totalPages, totalReports } = useSelector(
        (state) => state.housing.reportsInfo
    );

    const getHouseReport = async () => {
        const config = { page: currPage, limit: 3, houseId };
        await dispatch(getReportList(config));
    };

    useEffect(() => {
        getHouseReport();
    }, [page]);

    return (
        <div className='facility-reports outlined-container'>
            <header>
                <h1 className='title'>Facility Reports</h1>
            </header>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Create Time</TableCell>
                            <TableCell>Reporter</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {facilityReports?.length ? (
                            facilityReports.map((row) => (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {row.title}
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.createdAt}</TableCell>
                                    <TableCell>{`${row.createdBy.preferedName || row.createdBy.firstName} ${
                                        row.createdBy.lastName
                                    }`}</TableCell>
                                    <TableCell>
                                        <Button variant='outlined'>Comment</Button>
                                    </TableCell>
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
            <Button variant='outlined' sx={{ display: 'block' }}>
                Request New Report
            </Button>
        </div>
    );
};
export default HousingView;
