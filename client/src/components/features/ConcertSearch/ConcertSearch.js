import React, { useState } from 'react';
import { Input, FormGroup, Label, Col, Row } from 'reactstrap';
import './ConcertSearch.scss';

const ConcertSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPerformer, setSelectedPerformer] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  return (
    <div className="concert-search">
      <Row>
        <Col md={3}>
          <FormGroup>
            <Label for="searchTerm">Search concerts:</Label>
            <Input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Enter keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="selectedGenre">Select genre:</Label>
            <Input
              type="select"
              name="selectedGenre"
              id="selectedGenre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Jazz">Jazz</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="selectedPerformer">Select performer:</Label>
            <Input
              type="select"
              name="selectedPerformer"
              id="selectedPerformer"
              value={selectedPerformer}
              onChange={(e) => setSelectedPerformer(e.target.value)}
            >
              <option value="">All</option>
              <option value="Performer1">Performer1</option>
              <option value="Performer2">Performer2</option>
              <option value="Performer3">Performer3</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="selectedDay">Select day:</Label>
            <Input
              type="select"
              name="selectedDay"
              id="selectedDay"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">All</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
            </Input>
          </FormGroup>
        </Col>

        <Col md={3}>
          <FormGroup>
            <Label for="selectedPrice">Select price:</Label>
            <Input
              type="select"
              name="selectedPrice"
              id="selectedPrice"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option value="">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="100-50">$50 - $100</option>
            </Input>
          </FormGroup>
          <Col sm={1}>
            <button>Search</button>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ConcertSearch
