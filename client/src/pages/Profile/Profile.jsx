import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import Badge from '@mui/material/Badge';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeInfo, updateEmployeeAvatar, updateEmployeeInfo } from '../../store/profileSlice/profile.thunk';
import './profile.scss';
import { STATES } from '../../store/constant';
import FormControl from '@mui/material/FormControl';
import { selectIsLoggedIn } from '../../store/auth/auth.selector';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Chip, IconButton, Link, styled, Typography } from '@mui/material';
import { post, upload } from '../../services/api';

const Profile = ({ parent }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { info, loading, error } = useSelector((state) => state.profile);
    const { username } = useSelector(selectIsLoggedIn);
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        switch (parent) {
            case 'hr':
                const userName = queryParams.get('username');
                dispatch(fetchEmployeeInfo({ username: userName }));
                break;
            case 'employee':
                const formData = { username };
                dispatch(fetchEmployeeInfo(formData));
                break;
        }
    }, [dispatch]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <section>
            {parent === 'hr' && (
                <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '16px 0' }}>
                    <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: 'pointer' }}>
                        Go Back
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>Employee Profile</Typography>
                </Breadcrumbs>
            )}
            <header>
                <h1 className='title'>{parent === 'hr' ? 'Profile' : 'My Profile'}</h1>
            </header>
            <Stack spacing={2}>
                <AvatarSection info={info} username={username} showEdit={parent === 'employee'} />
                <PersonalSection info={info} username={username} showEdit={parent === 'employee'} />
                <AddressSection info={info} username={username} showEdit={parent === 'employee'} />
                <ContactSection info={info} username={username} showEdit={parent === 'employee'} />
                <EmploymentSetcion info={info} username={username} showEdit={parent === 'employee'} />
                <EmergencySection info={info} username={username} showEdit={parent === 'employee'} />
                <DocumentSection info={info} username={username} showEdit={parent === 'employee'} />
            </Stack>
            <div className='profile-container'></div>
        </section>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AvatarSection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        console.log(event.target.files[0]);

        if (file) {
            try {
                await uploadImageToServer(file);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const uploadImageToServer = async (file) => {
        // Example of how you could handle the file upload (adjust based on your backend API)
        const formData = new FormData();
        await formData.append('file', file);

        dispatch(updateEmployeeAvatar(formData));
    };

    return (
        <div className='outlined-container flex-row g-2'>
            <Badge
                overlap='circular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    showEdit && (
                        <IconButton component='label'>
                            <DriveFileRenameOutlineOutlinedIcon />
                            <VisuallyHiddenInput type='file' accept='image/*' onChange={handleImageChange} />
                        </IconButton>
                    )
                }
            >
                <Avatar alt='Travis Howard' src={info.image.src} sx={{ width: 100, height: 100 }} />
            </Badge>
            <div className='infos flex-col justify-between'>
                <div className='name'>
                    {info.preferedName || info.firstName} {info.lastName}
                </div>
                <div>Role: {info.role}</div>
                <div>Email: {info.email}</div>
                <div>Birth: {info.birth}</div>
            </div>
        </div>
    );
};

const PersonalSection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(info);
    }, [info]);

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    const validateForm = () => {
        const { phone } = formData;
        const errors = {};
        const phoneRegex = /^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;

        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(phone)) {
            errors.phone = 'Invalid phone number format';
        }

        return errors;
    };

    return (
        <div className='outlined-container'>
            <div className='title'>Personal Information</div>
            {edit ? (
                <>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <div className='buttons'>
                            <Button
                                variant='outlined'
                                color='error'
                                endIcon={<CancelOutlinedIcon />}
                                onClick={() => {
                                    setEdit(false);
                                    setFormData(info);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='outlined' color='secondary' endIcon={<SaveAsOutlinedIcon />} type='submit'>
                                Save
                            </Button>
                        </div>
                        <label className='input-item'>
                            First Name
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.firstName || ''}
                                onChange={handleChange('firstName')}
                                variant='standard'
                                maxLength='20'
                            />
                        </label>
                        <label className='input-item'>
                            Middle Name
                            <TextField
                                id='standard-required'
                                value={formData?.middleName || ''}
                                onChange={handleChange('middleName')}
                                variant='standard'
                                maxLength='20'
                            />
                        </label>
                        <label className='input-item'>
                            Last Name
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.lastName || ''}
                                onChange={handleChange('lastName')}
                                variant='standard'
                                maxLength='20'
                            />
                        </label>
                        <label className='input-item'>
                            Prefered Name
                            <TextField
                                id='standard-required'
                                value={formData?.preferedName || ''}
                                onChange={handleChange('preferedName')}
                                variant='standard'
                                maxLength='20'
                            />
                        </label>
                        <label className='input-item'>
                            Email Address
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.email || ''}
                                onChange={handleChange('email')}
                                variant='standard'
                                type='email'
                            />
                        </label>
                        <label className='input-item'>
                            Social Security Number
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.ssn || ''}
                                onChange={handleChange('ssn')}
                                variant='standard'
                                maxLength='9'
                            />
                        </label>
                        <label className='input-item'>
                            Date of Birth
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.birth || ''}
                                onChange={handleChange('birth')}
                                variant='standard'
                                type='date'
                            />
                        </label>
                        <label className='input-item'>
                            Gender
                            <FormControl sx={{ minWidth: 120 }} variant='standard' size='small'>
                                <Select label='gender' value={formData?.gender || ''} onChange={handleChange('gender')}>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='other'>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='view-container'>
                        <label className='view-item'>
                            First Name
                            <span>{info?.firstName}</span>
                        </label>
                        <label className='view-item'>
                            Middle Name
                            <span>{info?.middleName}</span>
                        </label>
                        <label className='view-item'>
                            Last Name
                            <span>{info?.lastName}</span>
                        </label>
                        <label className='view-item'>
                            Prefered Name
                            <span>{info?.preferedName}</span>
                        </label>
                        <label className='view-item'>
                            Email Address
                            <span>{info?.email}</span>
                        </label>
                        <label className='view-item'>
                            Social Security Number
                            <span>{info?.ssn}</span>
                        </label>
                        <label className='view-item'>
                            Date of Birth
                            <span>{info?.birth}</span>
                        </label>
                        <label className='view-item'>
                            Gender
                            <span>{info?.gender}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const AddressSection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;

            if (key.includes('.')) {
                const keys = key.split('.');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className='outlined-container'>
            <div className='title'>Address</div>
            {edit ? (
                <>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <div className='buttons'>
                            <Button
                                variant='outlined'
                                color='error'
                                endIcon={<CancelOutlinedIcon />}
                                onClick={() => {
                                    setEdit(false);
                                    setFormData(info);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='outlined' endIcon={<SaveAsOutlinedIcon />}>
                                Save
                            </Button>
                        </div>
                        <label className='input-item'>
                            Building/Apt #
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.address?.buildingOrAptNumber || ''}
                                onChange={handleChange('address.buildingOrAptNumber')}
                                variant='standard'
                            />
                        </label>
                        <label className='input-item'>
                            Street
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.address?.street || ''}
                                onChange={handleChange('address.street')}
                                variant='standard'
                                maxLength='30'
                            />
                        </label>
                        <label className='input-item'>
                            City
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.address?.city || ''}
                                onChange={handleChange('address.city')}
                                variant='standard'
                                maxLength='30'
                            />
                        </label>
                        <label className='input-item'>
                            State
                            <FormControl sx={{ minWidth: 120 }} variant='standard' size='small'>
                                <Select
                                    label='state'
                                    value={formData?.address?.state || ''}
                                    onChange={handleChange('address.state')}
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
                                value={formData?.address?.zipcode || ''}
                                onChange={handleChange('address.zipcode')}
                                variant='standard'
                                maxLength='6'
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='view-container'>
                        <label className='view-item'>
                            Building/Apt #<span>{info?.address?.buildingOrAptNumber}</span>
                        </label>
                        <label className='view-item'>
                            Street<span>{info?.address?.street}</span>
                        </label>
                        <label className='view-item'>
                            City<span>{info?.address?.city}</span>
                        </label>
                        <label className='view-item'>
                            State<span>{info?.address?.state}</span>
                        </label>
                        <label className='view-item'>
                            Zipcode<span>{info?.address?.zipcode}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const ContactSection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    const validateForm = () => {
        const { phone, workPhonephone } = formData;
        const errors = {};
        const phoneRegex = /^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;

        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(phone)) {
            errors.phone = 'Invalid phone number format';
        }
        if (!workPhonephone) {
            errors.workPhonephone = 'Phone number is required';
        } else if (!phoneRegex.test(phone)) {
            errors.workPhonephone = 'Invalid phone number format';
        }

        return errors;
    };

    return (
        <div className='outlined-container'>
            <div className='title'>Contact</div>
            {edit ? (
                <>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <div className='buttons'>
                            <Button
                                variant='outlined'
                                color='error'
                                endIcon={<CancelOutlinedIcon />}
                                onClick={() => {
                                    setEdit(false);
                                    setFormData(info);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='outlined' endIcon={<SaveAsOutlinedIcon />}>
                                Save
                            </Button>
                        </div>
                        <label className='input-item'>
                            Cell Phone Number
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.phone || ''}
                                onChange={handleChange('phone')}
                                variant='standard'
                                maxLength='10'
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </label>
                        <label className='input-item'>
                            Work Phone Number
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.workPhone || ''}
                                onChange={handleChange('workPhone')}
                                variant='standard'
                                maxLength='10'
                                error={!!errors.workPhonephone}
                                helperText={errors.workPhonephone}
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='view-container'>
                        <label className='view-item'>
                            Cell Phone Number
                            <span>{info?.phone}</span>
                        </label>
                        <label className='view-item'>
                            Work Phone Number
                            <span>{info?.workPhone}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const EmploymentSetcion = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);

    const handleChange = (key) => {
        if (key.includes('.')) {
            const keys = key.split('.');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className='outlined-container'>
            <div className='title'>Employment</div>
            {edit ? (
                <>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <div className='buttons'>
                            <Button
                                variant='outlined'
                                color='error'
                                endIcon={<CancelOutlinedIcon />}
                                onClick={() => {
                                    setEdit(false);
                                    setFormData(info);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='outlined' endIcon={<SaveAsOutlinedIcon />}>
                                Save
                            </Button>
                        </div>
                        <label className='input-item'>
                            Visa Title
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.visaStatus.visaTitle || ''}
                                onChange={handleChange('visaStatus.visaTitle')}
                                variant='standard'
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='view-container'>
                        <label className='view-item'>
                            Visa Title
                            <span>{info?.visaStatus?.visaTitle}</span>
                        </label>
                        <label className='view-item'>
                            Start Date
                            <span>{info?.visaStatus?.startDate}</span>
                        </label>
                        <label className='view-item'>
                            End Date
                            <span>{info?.visaStatus?.endDate}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

const EmergencySection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(info || { emergencyContacts: [] });
    const [edit, setEdit] = useState(false);

    const handleChange = (index, key) => (event) => {
        const value = event.target.value;
        console.log(value);

        setFormData((prev) => {
            const updatedContacts = [...prev.emergencyContacts];
            if (key.includes('.')) {
                const keys = key.split('.');
                updatedContacts[index] = {
                    ...updatedContacts[index],
                    [keys[0]]: { ...updatedContacts[index][keys[0]], [keys[1]]: value },
                };
            } else {
                updatedContacts[index] = { ...updatedContacts[index], [key]: value };
            }
            return { ...prev, emergencyContacts: updatedContacts };
        });
    };

    const handleAddContact = () => {
        setFormData((prev) => ({
            ...prev,
            emergencyContacts: [
                ...prev.emergencyContacts,
                { firstName: '', middleName: '', lastName: '', phone: '', email: '', relationship: '' },
            ],
        }));
    };

    const handleRemoveContact = (index) => {
        setFormData((prev) => {
            const updatedContacts = [...prev.emergencyContacts];
            updatedContacts.splice(index, 1);
            return { ...prev, emergencyContacts: updatedContacts };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit', formData);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    const validateForm = () => {
        const errors = {};
        const phoneRegex = /^(?:\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;

        formData.emergencyContacts.forEach((contact, index) => {
            const { phone } = contact;

            if (!phone) {
                errors[`phone_${index}`] = 'Phone number is required';
            } else if (!phoneRegex.test(phone)) {
                errors[`phone_${index}`] = 'Invalid phone number format';
            }
        });

        return errors;
    };

    return (
        <div className='outlined-container multi-container'>
            <div className='title'>Emergency Contact</div>
            {edit ? (
                <>
                    <form className='contact-form' onSubmit={handleSubmit}>
                        {formData.emergencyContacts.map((contact, index) => (
                            <div key={index} className='input-container'>
                                <label className='input-item'>
                                    First Name
                                    <TextField
                                        required
                                        value={contact.firstName || ''}
                                        onChange={handleChange(index, 'firstName')}
                                        variant='standard'
                                        maxLength='30'
                                    />
                                </label>
                                <label className='input-item'>
                                    Middle Name
                                    <TextField
                                        value={contact.middleName || ''}
                                        onChange={handleChange(index, 'middleName')}
                                        variant='standard'
                                        maxLength='30'
                                    />
                                </label>
                                <label className='input-item'>
                                    Last Name
                                    <TextField
                                        required
                                        value={contact.lastName || ''}
                                        onChange={handleChange(index, 'lastName')}
                                        variant='standard'
                                        maxLength='30'
                                    />
                                </label>
                                <label className='input-item'>
                                    Phone
                                    <TextField
                                        required
                                        value={contact.phone || ''}
                                        onChange={handleChange(index, 'phone')}
                                        variant='standard'
                                        error={!!errors[`phone_${index}`]}
                                        helperText={errors[`phone_${index}`]}
                                        maxLength='10'
                                    />
                                </label>
                                <label className='input-item'>
                                    Email Address
                                    <TextField
                                        required
                                        value={contact.email || ''}
                                        onChange={handleChange(index, 'email')}
                                        variant='standard'
                                        type='email'
                                        maxLength='50'
                                    />
                                </label>
                                <label className='input-item'>
                                    Relationship
                                    <Select
                                        label='relationship'
                                        value={contact.relationship || ''}
                                        onChange={handleChange(index, 'relationship')}
                                    >
                                        <MenuItem value='parent'>Parent</MenuItem>
                                        <MenuItem value='sibling'>Sibling</MenuItem>
                                        <MenuItem value='spouse'>Spouse</MenuItem>
                                        <MenuItem value='child'>Child</MenuItem>
                                        <MenuItem value='relative'>Relative</MenuItem>
                                        <MenuItem value='friend'>Friend</MenuItem>
                                        <MenuItem value='colleague'>Colleague</MenuItem>
                                        <MenuItem value='other'>Other</MenuItem>
                                    </Select>
                                </label>
                                <div className='remove-btn'>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        size='small'
                                        onClick={() => handleRemoveContact(index)}
                                    >
                                        Remove Contact
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className='buttons'>
                            <Button variant='outlined' color='primary' onClick={handleAddContact}>
                                Add Contact
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => {
                                    setEdit(false);
                                    setFormData(info);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant='outlined' type='submit' endIcon={<SaveAsOutlinedIcon />}>
                                Save
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='contact-container'>
                        {info.emergencyContacts.map((contact, index) => (
                            <>
                                <Chip variant='outlined' sx={{width: "fit-content"}} label={`Emergency ${index + 1}`}></Chip>
                                <div className='view-container' key={index}>
                                    <label className='view-item'>
                                        First Name
                                        <span>{contact?.firstName}</span>
                                    </label>
                                    <label className='view-item'>
                                        Middle Name
                                        <span>{contact?.middleName}</span>
                                    </label>
                                    <label className='view-item'>
                                        Last Name
                                        <span>{contact?.lastName}</span>
                                    </label>
                                    <label className='view-item'>
                                        Phone
                                        <span>{contact?.phone}</span>
                                    </label>
                                    <label className='view-item'>
                                        Email
                                        <span>{contact?.email}</span>
                                    </label>
                                    <label className='view-item'>
                                        Relationship
                                        <span>{contact?.relationship}</span>
                                    </label>
                                    <hr />
                                </div>
                            </>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const DocumentSection = ({ info, username, showEdit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(info);
    const [edit, setEdit] = useState(false);
    const handleChange = (key) => {
        return (event) => {
            const value = event.target.value;
            setFormData((prev) => ({ ...prev, [key]: value }));
        };
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateEmployeeInfo({ username, updateData: formData }));
        setEdit(false);
    };

    return (
        <div className='outlined-container'>
            <div className='title'>Documents</div>
            {edit ? (
                <>
                    <div className='buttons'>
                        <Button
                            variant='outlined'
                            color='error'
                            endIcon={<CancelOutlinedIcon />}
                            onClick={() => {
                                setEdit(false);
                                setFormData(info);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant='outlined' endIcon={<SaveAsOutlinedIcon />}>
                            Save
                        </Button>
                    </div>
                    <form className='input-container' onSubmit={handleSubmit}>
                        <label className='input-item'>
                            First Name
                            <TextField
                                required
                                id='standard-required'
                                value={formData?.firstName || ''}
                                onChange={handleChange('firstName')}
                                variant='standard'
                            />
                        </label>
                    </form>
                </>
            ) : (
                <>
                    <div className='buttons'>
                        {showEdit && (
                            <Button
                                variant='outlined'
                                endIcon={<DriveFileRenameOutlineOutlinedIcon />}
                                onClick={() => setEdit(true)}
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className='view-container'>
                        <label className='view-item'>
                            First Name
                            <span>{info?.firstName}</span>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
