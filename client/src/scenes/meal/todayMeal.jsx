import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getTodayMeal } from "../../services/opertions/meal";

const TodayMeal = () => {
    const [mealDatas, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMeals = async () => {
        try {
            const res = await getTodayMeal();
            const formattedMeals = (res.mealData || []).map((mealData) => ({
                id: mealData.id, // Assuming each mealData has an id, or use another unique field
                date: mealData.date,
                breakfast: mealData.breakfast,
                lunch: mealData.lunch,
                dinner: mealData.dinner,
            }));
            setMeals(formattedMeals);
        } catch (error) {
            console.error("Could not fetch meal details", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return `${dateObj.getDate()} ${dateObj.toLocaleString("default", { month: "long" })} ${dateObj.getFullYear()}`;
    };

    return (
        <Box m="20px">
            <Header title="Month Wise Meals" subtitle="Nov Month Meals." />

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{ marginTop: "30px", overflowX: "auto" }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Breakfast</TableCell>
                                <TableCell>Lunch</TableCell>
                                <TableCell>Dinner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mealDatas.map((meal) => (
                                <TableRow key={meal.id}>
                                    <TableCell>{formatDate(meal.date)}</TableCell>
                                    <TableCell>{meal.breakfast}</TableCell>
                                    <TableCell>{meal.lunch}</TableCell>
                                    <TableCell>{meal.dinner}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default TodayMeal;
