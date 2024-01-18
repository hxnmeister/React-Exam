import mongoose from "mongoose";

mongoose.connect('mongodb+srv://valeriystronskiy:g249bBLDrkJuNGhw@cluster0.p3a4g0e.mongodb.net/react_exam?retryWrites=true&w=majority');

export default mongoose.connection;