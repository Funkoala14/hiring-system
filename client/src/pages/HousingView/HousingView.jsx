import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectHousingByTitle } from "../../store/housingSlice/housing.selectors";
import { Breadcrumbs, Card, Typography } from "@mui/material";

const HousingView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const title = queryParams.get("title");

    // Use the selector to find the housing item by title
    const housing = useSelector(selectHousingByTitle(title));

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section>
            <Breadcrumbs aria-label='breadcrumb' sx={{ margin: "16px 0" }}>
                <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: "pointer" }}>
                    Go Back
                </Link>
                <Typography sx={{ color: "text.primary" }}>Housing Detail</Typography>
            </Breadcrumbs>
            {housing ? (
                <div className='flex-col g-1'>
                    <HousingDetail housing={housing} />
                    <HousingFaicilityReport />
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
            <Typography variant='h5' sx={{ m: "1rem 0" }}>
                Address
            </Typography>
            <div className='view-container' sx={{ p: "1rem" }}>
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
            <Typography variant='h5' sx={{ m: "1rem 0" }}>
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
        </div>
    );
};

const HousingFaicilityReport = () => {
    return (
        <div className='facility-reports outlined-container'>
            <div className='title'>Facility Reports</div>
        </div>
    );
};
export default HousingView;
