import React, { Component } from 'react'

import { 
  Button, Icon, Header,
  Menu, Input, Form,
  Sidebar, Segment,
  Modal
} from 'semantic-ui-react'

import { 
  withGoogleMap, withScriptjs,
  GoogleMap, Marker 
} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: -27.539909, lng: -48.498802 }}
  >
    {
      props.markers.map((marker) =>
        <Marker key={marker.index} position={marker.position} onClick={() => props.toggleImovelDetailsVisibility()} />
      )
    }
  </GoogleMap>
)))

export default class Home extends Component {

  state = {
    searchFormVisible: false,
    imovelDetailsVisible: false,
    searchMode: 'map',
    tipoImovel: null,
    disponibilidade: null,
    numeroQuartos: null,
    numeroGaragens: null,
    markers: [
      { index: 1, position: { lat: -27.547659, lng: -48.497837 } },
      { index: 2, position: { lat: -27.560695, lng: -48.501969 } },
      { index: 3, position: { lat: -27.556242, lng: -48.499497 } },
      { index: 4, position: { lat: -27.554760, lng: -48.497931 } }
    ]
  }

  toggleSearchFormVisibility = () => this.setState({ searchFormVisible: !this.state.searchFormVisible })

  toggleImovelDetailsVisibility = () => this.setState({ imovelDetailsVisible: !this.state.imovelDetailsVisible })

  handleDisponibilidadeChange = (e, { value }) => { }

  render() {
    return (
      <div>
        <Header as='h1'>Busca de Imóveis</Header>

        <Menu>
          <Menu.Item>
            <Button icon color='blue' onClick={() => this.toggleSearchFormVisibility()}>
              <Icon name='search' />
            </Button>  
          </Menu.Item>

          <Menu.Item>
            <Input 
              className='icon' icon='search' 
              placeholder='Informe a cidade ou o bairro do imóvel...' 
              style={{width: 320}}
            />
          </Menu.Item>

          <Menu.Item position='right'>
            <Button.Group>
              <Button color='google plus' icon='world' content='Mapa'></Button>
              <Button.Or text='ou' />
              <Button color='blue' icon='grid layout' content='Grid'></Button>
            </Button.Group>
          </Menu.Item>
        </Menu>

        <Sidebar.Pushable>
          <Sidebar animation='overlay' width='very wide' direction='left' visible={this.state.searchFormVisible}>
            <Segment style={{height: '100%'}}>
              <Form size='tiny'>
                <Form.Input label='Tipo do Imóvel' placeholder='Tipo do Imóvel...' />
                <Form.Input label='Cidade' placeholder='Cidade...' />
                <Form.Input label='Bairro' placeholder='Bairro...' />

                <Form.Group inline>
                  <label>Disponível para</label>
                  <Form.Radio label='Venda' value='venda' checked={this.state.disponibilidade === 'venda'} onChange={this.handleDisponibilidadeChange} />
                  <Form.Radio label='Aluguel' value='aluguel' checked={this.state.disponibilidade === 'aluguel'} onChange={this.handleDisponibilidadeChange} />
                </Form.Group>

                <Form.Group inline>
                  <label>Quartos</label>
                  <Form.Radio label='1' value='1' checked={this.state.numeroQuartos === '1'} />
                  <Form.Radio label='2' value='2' checked={this.state.numeroQuartos === '2'} />
                  <Form.Radio label='+3' value='+3' checked={this.state.numeroQuartos === '+3'} />
                </Form.Group>

                <Form.Group inline>
                  <label>Garagens</label>
                  <Form.Radio label='1' value='1' checked={this.state.numeroGaragens === '1'} />
                  <Form.Radio label='2' value='2' checked={this.state.numeroGaragens === '2'} />
                  <Form.Radio label='+3' value='+3' checked={this.state.numeroGaragens === '+3'} />
                </Form.Group>

                <Button 
                  color='red' size='tiny' icon='remove' content='Cancelar'
                  onClick={() => this.toggleSearchFormVisibility()}
                />
                <Button 
                  color='blue' size='tiny' icon='search' content='Buscar' 
                  onClick={() => this.toggleSearchFormVisibility()}
                />
              </Form>
            </Segment>
          </Sidebar>

          <Sidebar.Pusher>
            {this.state.searchMode === 'map' &&
            <MyMapComponent 
              markers={this.state.markers}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbAZsAD0dyCmoVyIJJhmlGa4XtjsxFdqQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              toggleImovelDetailsVisibility={this.toggleImovelDetailsVisibility}
            />}

            {this.state.searchMode === 'grid' && <div />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        <Modal 
          size='large' dimmer={false} 
          open={this.state.imovelDetailsVisible} 
          onClose={this.toggleImovelDetailsVisibility}
        >
          <Modal.Header>Detalhes do Imóvel Selecionado</Modal.Header>
          <Modal.Content>
            <p>imovel mimi</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.toggleImovelDetailsVisibility}>Fechar</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}