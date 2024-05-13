import React from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import Category from './Category';

const Container = styled.div`
width:100%;
height:100%;`

function Categories() {
  const [{ categoryPlaylists}, dispatch] = useStateProvider();
  console.log(categoryPlaylists);

  return (
    <Container>
      {categoryPlaylists.map((category)=>{
        return <Category key={category.id} category={category} />
      })}
    </Container>
  );
}

export default Categories;
