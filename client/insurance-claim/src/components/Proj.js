import React from 'react'

const Proj = ( { project }) => {
  return (
    <option value={project.ProjectID}>
      {project.ProjectName}
    </option>
  )
}

export default Proj
