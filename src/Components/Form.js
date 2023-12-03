import axios from "axios";
import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
display: flex;
align-items: flex-end;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shandow: 0px 0px 5px #ccc;
border-radius: 5px;
`;

const InputArea = styled.div`
display: flex;
flex-direciton: column;
`;

const Input = styled.input`
width: 120px;
padding: 0 10px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`
const Label = styled.label ``;

const Button = styled.button`
padding: 10px;
cursor: pointer;
border-radius: 5px;
border: none;
background-color: #2c73d2;
color: white;
height: 42px;
`;

const Form = ({getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect (() =>{
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.professor_responsavel.value = onEdit.professor_responsavel;
            user.categoria.value = onEdit.categoria;
            user.descricao.value = onEdit.descricao;
            
        }
    }, [onEdit]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.professor_responsavel.value ||
            !user.categoria.value ||
            !user.descricao.value 
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if (onEdit) {
            await axios
            .put ("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                professor_responsavel: user.professor_responsavel.value,
                categoria: user.categoria.value,
                descricao: user.descricao.value,
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        }
        else {
            await axios
            .post ("http://localhost:8800/", {
                nome: user.nome.value,
                professor_responsavel: user.professor_responsavel.value,
                categoria: user.categoria.value,
                descricao: user.descricao.value,
            })
            .then(({data}) => toast.success(data))
            .catch(({data}) => toast.error(data));
        }
        user.nome.value = "";
        user.professor_responsavel.value = "";
        user.categoria.value = "";
        user.descricao.value = "";

        setOnEdit (null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
            <Label>Professor Resposavel</Label>
            <Input name="professor_responsavel" type="professor_responsavel"/>
            </InputArea>
            <InputArea>
            <Label>Categoria</Label>
            <Input name="categoria"/>
            </InputArea>
            <InputArea>
            <Label>Descrição</Label>
            <Input name="descricao" type="descricao"/>
            </InputArea>

            <Button type="submit">Salvar</Button>
            </FormContainer>
    );
};

export default Form;