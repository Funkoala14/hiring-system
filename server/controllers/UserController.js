// TEST
export const getUser = (_req, res) => {
    res.status(200).json({ message: 'success', code: 200, data: { name: 'testuser' } });
};
