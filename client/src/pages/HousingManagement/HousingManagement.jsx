import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Link,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHousing, deleteHousing, fetchHousingList } from "../../store/housingSlice/housing.thunk";
import { STATES } from "../../store/constant";

const HousingManagement = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.housing);
    const [open, setOpen] = useState(false);
    const [currId, setCurrId] = useState(null);

    useEffect(() => {
        const fetchList = async () => {
            await dispatch(fetchHousingList());
        };

        fetchList();
    }, [dispatch]);

    const handleClickOpen = (id) => {
        setCurrId(id);
        setOpen(true);
    };

    const handleConfirm = async () => {
        handleClose();
        await dispatch(deleteHousing({ houseId: currId }));
    };

    const handleClose = () => {
        setCurrId(null);
        setOpen(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className='flex-col g-1 align-start'>
            <header>
                <h1 className='title'>Housing Management</h1>
            </header>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Landlord Name</TableCell>
                            <TableCell>Landlord Phone</TableCell>
                            <TableCell>Landlord Email</TableCell>
                            <TableCell align="center">Residents Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.length ? (
                            list.map((row) => (
                                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        <Link href={`/hr/housing-detail?title=${row.title}`}>{row.title}</Link>
                                    </TableCell>
                                    <TableCell>
                                        <p>{`${row.address.building}`}</p>
                                        <p>{`${row.address.street}, ${row.address.city}, ${row.address.state} ${row.address.zip}`}</p>
                                    </TableCell>
                                    <TableCell>{row.landlord.name}</TableCell>
                                    <TableCell>{row.landlord.phone}</TableCell>
                                    <TableCell>{row.landlord.email}</TableCell>
                                    <TableCell align="center">{row.residents.length || 0}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleClickOpen(row._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow sx={{ textAlign: "center" }}>
                                <TableCell colSpan={5} align='center'>
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddHousing />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{"Delete Housing"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure to delete this housing? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='outlined' onClick={handleConfirm} autoFocus color='error'>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

const AddHousing = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "House 3",
        address: {
            building: "Building A",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zip: "62701",
        },
        landlord: {
            name: "John Smith",
            phone: "6083654562",
            email: "landlord1@mail.com",
        },
    });
    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;

            if (key.includes(".")) {
                const keys = key.split(".");
                setFormData((prev) => {
                    return {
                        ...prev,
                        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
                    };
                });
            } else {
                setFormData((prev) => ({ ...prev, [key]: value }));
            }
        };
    };

    const validateForm = () => {
        const { phone } = formData.landlord;
        const errors = {};
        const phoneRegex = /^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;

        if (!phone) {
            errors.phone = "Phone number is required";
        } else if (!phoneRegex.test(phone)) {
            errors.phone = "Invalid phone number format";
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        dispatch(addHousing({ ...formData }));
    };

    return (
        <Card sx={{ width: "100%", padding: "1rem" }}>
            <header>
                <Typography variant='subtitle1' sx={{ pb: "0.5rem" }}>
                    Add Housing
                </Typography>
            </header>
            <form className='input-container' onSubmit={handleSubmit}>
                <label className='input-item'>
                    Title
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.title || ""}
                        onChange={handleChange("title")}
                        variant='standard'
                        maxLength='50'
                    />
                </label>
                <label className='input-item'>
                    Building/Apt #
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.address?.building || ""}
                        onChange={handleChange("address.building")}
                        variant='standard'
                        maxLength='10'
                    />
                </label>
                <label className='input-item'>
                    Street
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.address?.street || ""}
                        onChange={handleChange("address.street")}
                        variant='standard'
                        maxLength='50'
                    />
                </label>
                <label className='input-item'>
                    City
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.address?.city || ""}
                        onChange={handleChange("address.city")}
                        variant='standard'
                        maxLength='50'
                    />
                </label>
                <label className='input-item'>
                    State
                    <FormControl sx={{ minWidth: 120 }} variant='standard' size='small'>
                        <Select
                            label='state'
                            value={formData?.address?.state || ""}
                            onChange={handleChange("address.state")}
                        >
                            {STATES.map((state) => (
                                <MenuItem key={state.code} value={state.code}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </label>
                <label className='input-item'>
                    Zipcode
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.address?.zip || ""}
                        onChange={handleChange("address.zip")}
                        variant='standard'
                        maxLength='6'
                    />
                </label>
                <label className='input-item'>
                    Landlord Legal Full Name
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.landlord?.name || ""}
                        onChange={handleChange("landlord.name")}
                        variant='standard'
                    />
                </label>
                <label className='input-item'>
                    Landlord Phone Number
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.landlord?.phone || ""}
                        onChange={handleChange("landlord.phone")}
                        variant='standard'
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                </label>
                <label className='input-item'>
                    Landlord Phone Email Address
                    <TextField
                        required
                        id='standard-required'
                        value={formData?.landlord?.email || ""}
                        onChange={handleChange("landlord.email")}
                        variant='standard'
                        type='email'
                    />
                </label>
                <Button variant='outlined' type='submit'>
                    Add housing
                </Button>
            </form>
        </Card>
    );
};
export default HousingManagement;
