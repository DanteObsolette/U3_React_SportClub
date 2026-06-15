import { useEffect, useState } from "react"
import { Badge, Button, Card, Form, Spinner, Table } from "react-bootstrap"
import Swal from "sweetalert2"
import SportFormModal from "../../components/sports/SportFormModal"
import {
  createSport,
  deleteSport,
  getSports,
  updateSport,
  updateSportStatus,
} from "../../services/sportService"
import { flattenErrors } from "../../services/apiClient"
import { formatSpanishDate } from "../../utils/formatDate"

function SportsPage() {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedSport, setSelectedSport] = useState(null)
  const [statusLoadingId, setStatusLoadingId] = useState(null)

  const loadSports = async () => {
    try {
      setLoading(true)
      const response = await getSports()
      setSports(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSports()
  }, [])

  const openCreateModal = () => {
    setSelectedSport(null)
    setShowModal(true)
  }

  const openEditModal = (sport) => {
    setSelectedSport(sport)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSport(null)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedSport) {
        await updateSport(selectedSport.id, formData)
        Swal.fire("Actualizado", "Deporte actualizado correctamente", "success")
      } else {
        await createSport(formData)
        Swal.fire("Creado", "Deporte creado correctamente", "success")
      }

      closeModal()
      await loadSports()
    } catch (error) {
      const apiErrors = flattenErrors(error.body?.errors || {}).join(" ")
      Swal.fire(
        "Error",
        apiErrors || error.message || "No se pudo guardar el deporte",
        "error",
      )
    }
  }

  const handleDelete = async (sport) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este deporte?",
      text: `Se eliminará ${sport.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    })

    if (!result.isConfirmed) return

    try {
      await deleteSport(sport.id)
      Swal.fire("Eliminado", "Deporte eliminado correctamente", "success")
      await loadSports()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  }

  const handleStatusChange = async (sport, nextStatus) => {
    setStatusLoadingId(sport.id)

    try {
      const response = await updateSportStatus(sport.id, nextStatus)
      const updatedSport = response.data

      setSports((current) =>
        current.map((item) => (item.id === sport.id ? updatedSport : item)),
      )

      Swal.fire(
        "Estado actualizado",
        `El deporte ahora está ${nextStatus ? "activo" : "inactivo"}.`,
        "success",
      )
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setStatusLoadingId(null)
    }
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h4 className="mb-0">Gestión de Deportes</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={loadSports}>
            Refrescar
          </Button>
          <Button variant="primary" onClick={openCreateModal}>
            Nuevo Deporte
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" />
            <p className="mt-2">Cargando deportes...</p>
          </div>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Objetivo</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((sport) => (
                <tr key={sport.id}>
                  <td>{sport.id}</td>
                  <td>{sport.name}</td>
                  <td>{sport.objective}</td>
                  <td>{sport.duration} min</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Check
                        type="switch"
                        id={`sport-status-${sport.id}`}
                        label={sport.status ? "Activo" : "Inactivo"}
                        checked={Boolean(sport.status)}
                        disabled={statusLoadingId === sport.id}
                        onChange={(event) =>
                          handleStatusChange(sport, event.target.checked)
                        }
                      />
                      <Badge bg={sport.status ? "success" : "secondary"}>
                        {sport.status ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  </td>
                  <td>{formatSpanishDate(sport.created_at)}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(sport)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(sport)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      <SportFormModal
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedSport={selectedSport}
      />
    </Card>
  )
}

export default SportsPage
