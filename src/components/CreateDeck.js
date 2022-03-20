import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Checkbox from './Checkbox';
import Input from './Input';
import Select from './Select';
import './CreateDeck.css';
import './FilterSection.css';
import './DeckCard.css';

class CreateDeck extends React.Component {
  constructor() {
    super();
    this.filterCards = this.filterCards.bind(this);
  }

  filterCards() {
    const { data, filterTrunfo, filterName, filterRare } = this.props;
    if (filterTrunfo) {
      return (
        data.filter((filterSuperElement) =>
          (filterSuperElement.cardTrunfo === true)
      ));
    }
    return (
      data.reverse().filter((filterNameElement) =>
        filterNameElement.cardName.toLowerCase().includes(filterName.toLowerCase()))
        .filter((filterRareElement) => {
          if (filterRare === 'todas') return true;
          return (filterRareElement.cardRare === filterRare);
        })
    );
  }

  render() {
    const {
      filterName,
      filterRare,
      filterTrunfo,
      onInputChange,
      removeCard,
    } = this.props;
    const maxText = 80;
    const { filterCards } = this;
    const cardsNumber = filterCards().length;
    return (
      <section className="deck">
        <section className="filter-section">
          <Input
            testId="name-filter"
            text="Filtre pelo Nome"
            type="text"
            className="filterName"
            name="filterName"
            value={ filterName }
            maxLength="20"
            onChange={ onInputChange }
            disabled={ filterTrunfo }
          />
          <Select
            testId="rare-filter"
            name="filterRare"
            value={ filterRare }
            options={ ['todas', 'normal', 'raro', 'muito raro'] }
            onChange={ onInputChange }
            disabled={ filterTrunfo }
          />
          <Checkbox
            text="Super Trunfo"
            testId="trunfo-filter"
            className="deck-checkbox-div"
            id="deck-checkbox-input"
            name="filterTrunfo"
            checked={ filterTrunfo }
            onChange={ onInputChange }
          />
        </section>
        <section className="cards">
          <h2 className="cards-title">{`Cards: ${cardsNumber}`}</h2>
          {filterCards().map((mapElement) => (
              <section key={ mapElement.cardName } className="deck-card-section">
                <Card
                  cardName={ mapElement.cardName }
                  cardDescription={ mapElement.cardDescription.slice(0, maxText) }
                  cardAttr1={ mapElement.cardAttr1 }
                  cardAttr2={ mapElement.cardAttr2 }
                  cardAttr3={ mapElement.cardAttr3 }
                  cardImage={ mapElement.cardImage }
                  cardRare={ mapElement.cardRare }
                  cardTrunfo={ mapElement.cardTrunfo }
                />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ removeCard }
                >
                  Excluir
                </button>
              </section>
            ))}
        </section>
      </section>
    );
  }
}

CreateDeck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filterName: PropTypes.string.isRequired,
  filterRare: PropTypes.string.isRequired,
  filterTrunfo: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default CreateDeck;
